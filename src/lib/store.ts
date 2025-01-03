import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DiaryEntry, PlannerTask, User } from '../types';

interface AppState {
  user: User | null;
  diaryEntries: DiaryEntry[];
  plannerTasks: PlannerTask[];
  setUser: (user: User | null) => void;
  setDiaryEntries: (entries: DiaryEntry[]) => void;
  setPlannerTasks: (tasks: PlannerTask[]) => void;
  addDiaryEntry: (entry: DiaryEntry) => void;
  updateDiaryEntry: (entryId: string, updates: Partial<DiaryEntry>) => void;
  deleteDiaryEntry: (entryId: string) => void;
  addPlannerTask: (task: PlannerTask) => void;
  updatePlannerTask: (taskId: string, updates: Partial<PlannerTask>) => void;
  deletePlannerTask: (taskId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      diaryEntries: [],
      plannerTasks: [],
      setUser: (user) => set({ user }),
      setDiaryEntries: (entries) => set({ diaryEntries: entries }),
      setPlannerTasks: (tasks) => set({ plannerTasks: tasks }),
      addDiaryEntry: (entry) =>
        set((state) => ({
          diaryEntries: [entry, ...state.diaryEntries],
        })),
      updateDiaryEntry: (entryId, updates) =>
        set((state) => ({
          diaryEntries: state.diaryEntries.map((entry) =>
            entry.id === entryId ? { ...entry, ...updates } : entry
          ),
        })),
      deleteDiaryEntry: (entryId) =>
        set((state) => ({
          diaryEntries: state.diaryEntries.filter((entry) => entry.id !== entryId),
        })),
      addPlannerTask: (task) =>
        set((state) => ({
          plannerTasks: [...state.plannerTasks, task],
        })),
      updatePlannerTask: (taskId, updates) =>
        set((state) => ({
          plannerTasks: state.plannerTasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
      deletePlannerTask: (taskId) =>
        set((state) => ({
          plannerTasks: state.plannerTasks.filter((task) => task.id !== taskId),
        })),
    }),
    {
      name: 'retro-diary-storage',
    }
  )
);