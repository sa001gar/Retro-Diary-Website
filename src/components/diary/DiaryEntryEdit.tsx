import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { DiaryEntry } from '../../types';

interface DiaryEntryEditProps {
  entry: DiaryEntry;
  onSave: (content: string, tags: string[]) => void;
  onCancel: () => void;
}

export default function DiaryEntryEdit({ entry, onSave, onCancel }: DiaryEntryEditProps) {
  const [content, setContent] = useState(entry.content);
  const [tags, setTags] = useState<string[]>(entry.tags);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(content, tags);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="retro-input w-full h-48"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts..."
      />

      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="retro-input flex-1"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="retro-button px-3 py-1"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="bg-[#d4e5ff] px-2 py-1 rounded-md flex items-center space-x-1"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="retro-button flex-1"
          disabled={!content}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="retro-button bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}