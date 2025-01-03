/*
  # Create tables and policies
  
  1. Tables
    - diary_entries: Stores user diary entries with content and tags
    - planner_tasks: Stores user tasks with time slots
  
  2. Security
    - RLS enabled for both tables
    - Policies for authenticated users to manage their own data
*/

-- Create diary_entries table
CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create planner_tasks table
CREATE TABLE IF NOT EXISTS planner_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  title text NOT NULL,
  time_slot text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE planner_tasks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can manage their own diary entries" ON diary_entries;
DROP POLICY IF EXISTS "Users can manage their own planner tasks" ON planner_tasks;

-- Create policies
CREATE POLICY "Users can manage their own diary entries"
  ON diary_entries FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own planner tasks"
  ON planner_tasks FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_diary_entries_user_date ON diary_entries(user_id, date);
CREATE INDEX IF NOT EXISTS idx_planner_tasks_user_date ON planner_tasks(user_id, date);