// Types for the Instructor Progress Dashboard

export interface CourseSession {
  id: string;
  session_name: string;
  start_date: string;
  end_date: string | null;
  current_day: number;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface InstructorChecklistItem {
  id: string;
  day_number: number;
  phase: 'pre' | 'during' | 'after';
  item_key: string;
  content_en: string;
  content_ar: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InstructorChecklistProgress {
  id: string;
  session_id: string;
  checklist_item_id: string;
  is_completed: boolean;
  completed_at: string | null;
  completed_by: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface InstructorSessionNotes {
  id: string;
  session_id: string;
  day_number: number;
  common_mistakes: string | null;
  observations: string | null;
  learner_highlights: string | null;
  improvements_for_next_time: string | null;
  created_at: string;
  updated_at: string;
}

// Static content types for the dashboard
export interface TimelineItem {
  time: string;
  duration: string;
  title: string;
  description?: string;
}

export interface TalkTrackSection {
  id: string;
  title: string;
  time: string;
  script: string;
}

export interface Exercise {
  id: string;
  title: string;
  duration: string;
  instructions: string[];
  expectedOutput: string;
  debriefQuestions: string[];
}

export interface DayOutcome {
  id: string;
  description: string;
}

export interface OperatingPrinciple {
  id: string;
  title: string;
  items: string[];
}

export interface TroubleshootingScenario {
  id: string;
  title: string;
  symptoms: string;
  script: string;
  fallback?: string;
}

export interface SharedAsset {
  id: string;
  name: string;
  description: string;
}

export interface DayContent {
  dayNumber: number;
  title: string;
  subtitle: string;
  sessionLength: string;
  outcomes: DayOutcome[];
  timeline: TimelineItem[];
  talkTracks: TalkTrackSection[];
  exercises: Exercise[];
}

// Combined checklist item with progress
export interface ChecklistItemWithProgress extends InstructorChecklistItem {
  progress?: InstructorChecklistProgress;
}
