export interface DiaryEntry {
  id: string;
  user_id: string;
  date: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface PlannerTask {
  id: string;
  user_id: string;
  date: string;
  title: string;
  time_slot: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  profile?: UserProfile;
}

export interface UserProfile {
  full_name?: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
  theme_preference?: 'light' | 'dark';
  notification_preferences?: {
    email: boolean;
    push: boolean;
  };
}