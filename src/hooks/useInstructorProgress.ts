import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  CourseSession,
  InstructorChecklistItem,
  InstructorChecklistProgress,
  InstructorSessionNotes,
  ChecklistItemWithProgress
} from '@/types/instructorDashboard';

// Helper to type-cast supabase queries for tables not yet in generated types
const fromTable = (tableName: string) => {
  return supabase.from(tableName as any);
};

export const useInstructorProgress = () => {
  const [sessions, setSessions] = useState<CourseSession[]>([]);
  const [activeSession, setActiveSession] = useState<CourseSession | null>(null);
  const [checklistItems, setChecklistItems] = useState<InstructorChecklistItem[]>([]);
  const [checklistProgress, setChecklistProgress] = useState<InstructorChecklistProgress[]>([]);
  const [sessionNotes, setSessionNotes] = useState<InstructorSessionNotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all sessions
  const fetchSessions = useCallback(async () => {
    try {
      const { data, error } = await fromTable('course_sessions')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      const sessionsData = (data as unknown as CourseSession[]) || [];
      setSessions(sessionsData);

      // Set active session if exists
      const active = sessionsData.find(s => s.is_active);
      if (active) {
        setActiveSession(active);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Fetch all checklist items
  const fetchChecklistItems = useCallback(async () => {
    try {
      const { data, error } = await fromTable('instructor_checklist_items')
        .select('*')
        .eq('is_active', true)
        .order('day_number', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) throw error;
      setChecklistItems((data as unknown as InstructorChecklistItem[]) || []);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Fetch checklist progress for active session
  const fetchChecklistProgress = useCallback(async (sessionId: string) => {
    try {
      const { data, error } = await fromTable('instructor_checklist_progress')
        .select('*')
        .eq('session_id', sessionId);

      if (error) throw error;
      setChecklistProgress((data as unknown as InstructorChecklistProgress[]) || []);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Fetch session notes
  const fetchSessionNotes = useCallback(async (sessionId: string) => {
    try {
      const { data, error } = await fromTable('instructor_session_notes')
        .select('*')
        .eq('session_id', sessionId);

      if (error) throw error;
      setSessionNotes((data as unknown as InstructorSessionNotes[]) || []);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Create a new session
  const createSession = async (session: Omit<CourseSession, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    const { data: userData } = await supabase.auth.getUser();

    const { data, error } = await fromTable('course_sessions')
      .insert({
        ...session,
        created_by: userData.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    await fetchSessions();
    return data as unknown as CourseSession;
  };

  // Update session
  const updateSession = async (id: string, updates: Partial<CourseSession>) => {
    const { error } = await fromTable('course_sessions')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    await fetchSessions();
  };

  // Set active session
  const setSessionActive = async (sessionId: string) => {
    // First, deactivate all sessions
    await fromTable('course_sessions')
      .update({ is_active: false })
      .neq('id', 'none');

    // Then activate the selected session
    const { error } = await fromTable('course_sessions')
      .update({ is_active: true })
      .eq('id', sessionId);

    if (error) throw error;
    await fetchSessions();
  };

  // Update current day for session
  const updateCurrentDay = async (sessionId: string, dayNumber: number) => {
    const { error } = await fromTable('course_sessions')
      .update({ current_day: dayNumber })
      .eq('id', sessionId);

    if (error) throw error;
    await fetchSessions();
  };

  // Toggle checklist item completion
  const toggleChecklistItem = async (sessionId: string, checklistItemId: string, isCompleted: boolean) => {
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

    await fetchChecklistProgress(sessionId);
  };

  // Save session notes for a day
  const saveSessionNotes = async (
    sessionId: string,
    dayNumber: number,
    notes: Partial<Omit<InstructorSessionNotes, 'id' | 'session_id' | 'day_number' | 'created_at' | 'updated_at'>>
  ) => {
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

    await fetchSessionNotes(sessionId);
  };

  // Get checklist items with progress for a specific day and phase
  const getChecklistItemsWithProgress = (dayNumber: number, phase?: 'pre' | 'during' | 'after'): ChecklistItemWithProgress[] => {
    let items = checklistItems.filter(item => item.day_number === dayNumber);

    if (phase) {
      items = items.filter(item => item.phase === phase);
    }

    return items.map(item => {
      const progress = checklistProgress.find(p => p.checklist_item_id === item.id);
      return {
        ...item,
        progress
      };
    });
  };

  // Get notes for a specific day
  const getNotesForDay = (sessionId: string, dayNumber: number): InstructorSessionNotes | undefined => {
    return sessionNotes.find(n => n.session_id === sessionId && n.day_number === dayNumber);
  };

  // Calculate progress percentage for a day
  const getDayProgress = (dayNumber: number): number => {
    const dayItems = checklistItems.filter(item => item.day_number === dayNumber);
    if (dayItems.length === 0) return 0;

    const completedItems = dayItems.filter(item => {
      const progress = checklistProgress.find(p => p.checklist_item_id === item.id);
      return progress?.is_completed;
    });

    return Math.round((completedItems.length / dayItems.length) * 100);
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchSessions(), fetchChecklistItems()]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchSessions, fetchChecklistItems]);

  // Fetch progress when active session changes
  useEffect(() => {
    if (activeSession) {
      fetchChecklistProgress(activeSession.id);
      fetchSessionNotes(activeSession.id);
    }
  }, [activeSession, fetchChecklistProgress, fetchSessionNotes]);

  return {
    // State
    sessions,
    activeSession,
    checklistItems,
    checklistProgress,
    sessionNotes,
    loading,
    error,

    // Actions
    fetchSessions,
    fetchChecklistItems,
    createSession,
    updateSession,
    setSessionActive,
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
