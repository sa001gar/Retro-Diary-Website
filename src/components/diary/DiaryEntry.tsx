import React, { useState } from 'react';
import { format } from 'date-fns';
import { DiaryEntry as DiaryEntryType } from '../../types';
import DiaryEntryActions from './DiaryEntryActions';
import DiaryEntryEdit from './DiaryEntryEdit';
import { supabase } from '../../lib/supabase';
import { useStore } from '../../lib/store';

interface DiaryEntryProps {
  entry: DiaryEntryType;
}

export default function DiaryEntry({ entry }: DiaryEntryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateDiaryEntry, deleteDiaryEntry } = useStore();

  const handleSave = async (content: string, tags: string[]) => {
    const updates = {
      content,
      tags,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('diary_entries')
      .update(updates)
      .eq('id', entry.id);

    if (!error) {
      updateDiaryEntry(entry.id, updates);
      setIsEditing(false);
    } else {
      console.error('Error updating entry:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    const { error } = await supabase
      .from('diary_entries')
      .delete()
      .eq('id', entry.id);

    if (!error) {
      deleteDiaryEntry(entry.id);
    } else {
      console.error('Error deleting entry:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="retro-card">
        <DiaryEntryEdit
          entry={entry}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="retro-card">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm text-gray-500">
          {format(new Date(entry.created_at), 'h:mm a')}
        </div>
        <DiaryEntryActions
          entry={entry}
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
        />
      </div>
      <p className="whitespace-pre-wrap mb-3">{entry.content}</p>
      <div className="flex flex-wrap gap-2">
        {entry.tags.map(tag => (
          <span key={tag} className="bg-[#d4e5ff] px-2 py-1 rounded-md text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}