import React from 'react';
import { useStore } from '../../lib/store';
import DiaryEntry from './DiaryEntry';

interface DiaryListProps {
  date: string;
}

export default function DiaryList({ date }: DiaryListProps) {
  const { diaryEntries } = useStore();
  const entries = diaryEntries.filter(entry => entry.date === date);

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}