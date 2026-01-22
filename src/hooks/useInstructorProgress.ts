import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  CourseSession,
  InstructorChecklistItem,
  InstructorChecklistProgress,
  InstructorSessionNotes,
  ChecklistItemWithProgress
} from '@/types/instructorDashboard';
import { checklistTranslations } from '@/data/checklistTranslations';

// Helper to type-cast supabase queries for tables not yet in generated types
const fromTable = (tableName: string) => {
  return supabase.from(tableName as any);
};

// Fetch functions with automatic retry logic from QueryClient
const fetchSessions = async () => {
  const { data, error } = await fromTable('course_sessions')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) throw error;
  return (data as unknown as CourseSession[]) || [];
};

const fetchChecklistItems = async () => {
  const { data, error } = await fromTable('instructor_checklist_items')
    .select('*')
    .eq('is_active', true)
    .order('day_number', { ascending: true })
    .order('display_order', { ascending: true });

  if (error) throw error;

  // Enhance fetched items with Arabic translations
  const fetchedItems = (data as unknown as InstructorChecklistItem[]) || [];
  const enhancedItems = fetchedItems.map(item => ({
    ...item,
    // If content_ar is fetched (and DB has column), use it.
    // If it's missing or null, try to map from translations by key or English content
    content_ar: item.content_ar || checklistTranslations[item.item_key] || checklistTranslations[item.content_en] || null
  }));

  return enhancedItems;
};

const fetchChecklistProgress = async (sessionId: string) => {
  const { data, error } = await fromTable('instructor_checklist_progress')
    .select('*')
    .eq('session_id', sessionId);

  if (error) throw error;
  return (data as unknown as InstructorChecklistProgress[]) || [];
};

const fetchSessionNotes = async (sessionId: string) => {
  const { data, error } = await fromTable('instructor_session_notes')
    .select('*')
    .eq('session_id', sessionId);

  if (error) throw error;
  return (data as unknown as InstructorSessionNotes[]) || [];
};

export const useInstructorProgress = () => {
  const queryClient = useQueryClient();
  const [activeSession, setActiveSession] = useState<CourseSession | null>(null);

  // Queries with automatic retry logic from QueryClient
  const { data: sessions = [], isLoading: loading, error } = useQuery({
    queryKey: ['instructorSessions'],
    queryFn: fetchSessions,
  });

  const { data: checklistItems = [] } = useQuery({
    queryKey: ['instructorChecklistItems'],
    queryFn: fetchChecklistItems,
  });

  const { data: checklistProgress = [] } = useQuery({
    queryKey: ['checklistProgress', activeSession?.id],
    queryFn: () => fetchChecklistProgress(activeSession?.id || ''),
    enabled: !!activeSession,
  });

  const { data: sessionNotes = [] } = useQuery({
    queryKey: ['sessionNotes', activeSession?.id],
    queryFn: () => fetchSessionNotes(activeSession?.id || ''),
    enabled: !!activeSession,
  });

  // Set active session when sessions change
  useEffect(() => {
    if (sessions.length > 0 && !activeSession) {
      const active = sessions.find(s => s.is_active);
      if (active) {
        setActiveSession(active);
      }
    }
  }, [sessions, activeSession]);

  // Mutations with automatic retry logic from QueryClient
  const createSessionMutation = useMutation({
    mutationFn: async (session: Omit<CourseSession, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      const { data: userData } = await supabase.auth.getUser();

      const { data, error } = await fromTable('course_sessions')
        .insert({
          ...session,
          created_by: userData.user?.id
        })
        .select()
        .single();

      if (error) throw error;
      return data as unknown as CourseSession;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructorSessions'] });
    },
  });

  const updateSessionMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CourseSession> }) => {
      const { error } = await fromTable('course_sessions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructorSessions'] });
    },
  });

  const setSessionActiveMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      // First, deactivate all sessions
      await fromTable('course_sessions')
        .update({ is_active: false })
        .neq('id', 'none');

      // Then activate the selected session
      const { error } = await fromTable('course_sessions')
        .update({ is_active: true })
        .eq('id', sessionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructorSessions'] });
    },
  });

  const updateCurrentDayMutation = useMutation({
    mutationFn: async ({ sessionId, dayNumber }: { sessionId: string; dayNumber: number }) => {
      const { error } = await fromTable('course_sessions')
        .update({ current_day: dayNumber })
        .eq('id', sessionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructorSessions'] });
    },
  });

  const toggleChecklistItemMutation = useMutation({
    mutationFn: async ({ sessionId, checklistItemId, isCompleted }: { sessionId: string; checklistItemId: string; isCompleted: boolean }) => {
      const { data: userData } = await supabase.auth.getUser();

      const existingProgress = checklistProgress.find(
        p => p.session_id === sessionId && p.checklist_item_id === checklistItemId
      );

      if (existingProgress) {
        // Update existing progress
        const { error } = await fromTable('instructor_checklist_progress')
          .update({
            is_completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
            completed_by: isCompleted ? userData.user?.id : null
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        // Create new progress entry
        const { error } = await fromTable('instructor_checklist_progress')
          .insert({
            session_id: sessionId,
            checklist_item_id: checklistItemId,
            is_completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
            completed_by: isCompleted ? userData.user?.id : null
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      if (activeSession) {
        queryClient.invalidateQueries({ queryKey: ['checklistProgress', activeSession.id] });
      }
    },
  });

  const saveSessionNotesMutation = useMutation({
    mutationFn: async ({ sessionId, dayNumber, notes }: { sessionId: string; dayNumber: number; notes: Partial<Omit<InstructorSessionNotes, 'id' | 'session_id' | 'day_number' | 'created_at' | 'updated_at'>> }) => {
      const existingNotes = sessionNotes.find(
        n => n.session_id === sessionId && n.day_number === dayNumber
      );

      if (existingNotes) {
        const { error } = await fromTable('instructor_session_notes')
          .update(notes)
          .eq('id', existingNotes.id);

        if (error) throw error;
      } else {
        const { error } = await fromTable('instructor_session_notes')
          .insert({
            session_id: sessionId,
            day_number: dayNumber,
            ...notes
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      if (activeSession) {
        queryClient.invalidateQueries({ queryKey: ['sessionNotes', activeSession.id] });
      }
    },
  });

  // Helper functions
  const getChecklistItemsWithProgress = (dayNumber: number, phase?: 'pre' | 'during' | 'after'): ChecklistItemWithProgress[] => {
    let items = (checklistItems as InstructorChecklistItem[]).filter(item => item.day_number === dayNumber);

    if (phase) {
      items = items.filter(item => item.phase === phase);
    }

    return items.map(item => {
      const progress = (checklistProgress as InstructorChecklistProgress[]).find(p => p.checklist_item_id === item.id);
      return {
        ...item,
        progress
      };
    });
  };

  const getNotesForDay = (sessionId: string, dayNumber: number): InstructorSessionNotes | undefined => {
    return (sessionNotes as InstructorSessionNotes[]).find(n => n.session_id === sessionId && n.day_number === dayNumber);
  };

  const getDayProgress = (dayNumber: number): number => {
    const dayItems = (checklistItems as InstructorChecklistItem[]).filter(item => item.day_number === dayNumber);
    if (dayItems.length === 0) return 0;

    const completedItems = dayItems.filter(item => {
      const progress = (checklistProgress as InstructorChecklistProgress[]).find(p => p.checklist_item_id === item.id);
      return progress?.is_completed;
    });

    return Math.round((completedItems.length / dayItems.length) * 100);
  };

  // Wrapper functions for mutations
  const createSession = (session: Omit<CourseSession, 'id' | 'created_at' | 'updated_at' | 'created_by'>) =>
    createSessionMutation.mutateAsync(session);

  const updateSession = (id: string, updates: Partial<CourseSession>) =>
    updateSessionMutation.mutateAsync({ id, updates });

  const setSessionActiveAction = (sessionId: string) =>
    setSessionActiveMutation.mutateAsync(sessionId);

  const updateCurrentDay = (sessionId: string, dayNumber: number) =>
    updateCurrentDayMutation.mutateAsync({ sessionId, dayNumber });

  const toggleChecklistItem = (sessionId: string, checklistItemId: string, isCompleted: boolean) =>
    toggleChecklistItemMutation.mutateAsync({ sessionId, checklistItemId, isCompleted });

  const saveSessionNotes = (sessionId: string, dayNumber: number, notes: Partial<Omit<InstructorSessionNotes, 'id' | 'session_id' | 'day_number' | 'created_at' | 'updated_at'>>) =>
    saveSessionNotesMutation.mutateAsync({ sessionId, dayNumber, notes });

  return {
    // State
    sessions,
    activeSession,
    checklistItems,
    checklistProgress,
    sessionNotes,
    loading,
    error: error ? (error as Error).message : null,

    // Actions
    createSession,
    updateSession,
    setSessionActive: setSessionActiveAction,
    updateCurrentDay,
    toggleChecklistItem,
    saveSessionNotes,

    // Helpers
    getChecklistItemsWithProgress,
    getNotesForDay,
    getDayProgress,
    setActiveSession
  };
};
