import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { supabase } from '../../lib/supabase';
import { Tag, Plus, X } from 'lucide-react';

export default function DiaryEditor({ date }: { date: string }) {
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { user, addDiaryEntry } = useStore();

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSave = async () => {
    if (!user) return;

    const entry = {
      id: crypto.randomUUID(),
      user_id: user.id, // Changed from userId to user_id
      date,
      content,
      tags,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('diary_entries').insert(entry);

    if (!error) {
      addDiaryEntry(entry);
      setContent('');
      setTags([]);
    } else {
      console.error('Error saving diary entry:', error);
    }
  };

  return (
    <div className="retro-card">
      <textarea
        className="retro-input w-full h-48 mb-4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts..."
      />
      <div className="flex items-center space-x-2 mb-4">
        <Tag className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="retro-input flex-1"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Add a tag"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
        />
        <button className="retro-button px-3 py-1" onClick={handleAddTag}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="bg-[#d4e5ff] px-2 py-1 rounded-md flex items-center space-x-1">
            <span>{tag}</span>
            <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
      <button className="retro-button w-full" onClick={handleSave} disabled={!content}>
        Save Entry
      </button>
    </div>
  );
}