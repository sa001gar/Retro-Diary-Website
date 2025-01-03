import React from 'react';
import { useStore } from '../../lib/store';
import { BookOpen, Hash, Calendar } from 'lucide-react';

export default function DiaryStats() {
  const { diaryEntries } = useStore();
  
  const totalEntries = diaryEntries.length;
  const uniqueDates = new Set(diaryEntries.map(entry => entry.date)).size;
  const uniqueTags = new Set(diaryEntries.flatMap(entry => entry.tags)).size;

  return (
    <div className="retro-card">
      <h3 className="font-medium mb-4">Diary Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-500" />
          <div className="font-bold">{totalEntries}</div>
          <div className="text-sm text-gray-500">Entries</div>
        </div>
        <div className="text-center">
          <Calendar className="h-6 w-6 mx-auto mb-2 text-green-500" />
          <div className="font-bold">{uniqueDates}</div>
          <div className="text-sm text-gray-500">Days</div>
        </div>
        <div className="text-center">
          <Hash className="h-6 w-6 mx-auto mb-2 text-purple-500" />
          <div className="font-bold">{uniqueTags}</div>
          <div className="text-sm text-gray-500">Tags</div>
        </div>
      </div>
    </div>
  );
}