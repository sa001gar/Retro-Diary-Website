import { supabase } from './supabase';
import { useStore } from './store';
import { DiaryEntry, PlannerTask } from '../types';

export async function syncData() {
  const { user, setDiaryEntries, setPlannerTasks } = useStore.getState();
  if (!user) return;

  // Fetch diary entries
  const { data: diaryData, error: diaryError } = await supabase
    .from('diary_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (!diaryError && diaryData) {
    setDiaryEntries(diaryData as DiaryEntry[]);
  }

  // Fetch planner tasks
  const { data: taskData, error: taskError } = await supabase
    .from('planner_tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('time_slot', { ascending: true });

  if (!taskError && taskData) {
    setPlannerTasks(taskData as PlannerTask[]);
  }
}