/*
  # Initial Schema Setup for Retro Diary

  1. Tables
    - diary_entries
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - date (date)
      - content (text)
      - tags (text array)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - planner_tasks
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - date (date)
      - title (text)
      - time_slot (text)
      - completed (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Diary Entries Table
CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own diary entries"
  ON diary_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Planner Tasks Table
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

ALTER TABLE planner_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own planner tasks"
  ON planner_tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_diary_entries_user_date ON diary_entries(user_id, date);
CREATE INDEX IF NOT EXISTS idx_planner_tasks_user_date ON planner_tasks(user_id, date);