import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { supabase } from '../../lib/supabase';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  date: string;
}

export default function TaskForm({ date }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00');
  const { user, addPlannerTask } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title) return;

    const task = {
      id: crypto.randomUUID(),
      user_id: user.id, // Changed from userId to user_id
      date,
      title,
      time_slot: timeSlot,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('planner_tasks').insert(task);

    if (!error) {
      addPlannerTask(task);
      setTitle('');
      setTimeSlot('09:00');
    } else {
      console.error('Error saving task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="retro-card">
      <div className="flex space-x-4">
        <input
          type="time"
          className="retro-input w-32"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />
        <input
          type="text"
          className="retro-input flex-1"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="retro-button px-3" disabled={!title}>
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}