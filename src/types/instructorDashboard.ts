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
  title_ar?: string;
  description?: string;
  description_ar?: string;
}

export interface TalkTrackSection {
  id: string;
  title: string;
  title_ar?: string;
  time: string;
  script: string;
  script_ar?: string;
}

export interface Exercise {
  id: string;
  title: string;
  title_ar?: string;
  duration: string;
  instructions: string[];
  instructions_ar?: string[];
  expectedOutput: string;
  expectedOutput_ar?: string;
  debriefQuestions: string[];
  debriefQuestions_ar?: string[];
}

export interface DayOutcome {
  id: string;
  description: string;
  description_ar?: string;
}

export interface OperatingPrinciple {
  id: string;
  title: string;
  title_ar?: string;
  items: string[];
  items_ar?: string[];
}

export interface TroubleshootingScenario {
  id: string;
  title: string;
  title_ar?: string;
  symptoms: string;
  symptoms_ar?: string;
  script: string;
  script_ar?: string;
  fallback?: string;
  fallback_ar?: string;
}

export interface SharedAsset {
  id: string;
  name: string;
  name_ar?: string;
  description: string;
  description_ar?: string;
}

export interface DayContent {
  dayNumber: number;
  title: string;
  title_ar?: string;
  subtitle: string;
  subtitle_ar?: string;
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
