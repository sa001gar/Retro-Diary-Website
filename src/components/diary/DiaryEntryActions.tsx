import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { DiaryEntry } from '../../types';

interface DiaryEntryActionsProps {
  entry: DiaryEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export default function DiaryEntryActions({ entry, onEdit, onDelete }: DiaryEntryActionsProps) {
  return (
    <div className="flex space-x-2">
      <button 
        onClick={onEdit}
        className="text-blue-500 hover:text-blue-700 transition-colors"
        title="Edit entry"
      >
        <Edit2 className="h-4 w-4" />
      </button>
      <button 
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 transition-colors"
        title="Delete entry"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}