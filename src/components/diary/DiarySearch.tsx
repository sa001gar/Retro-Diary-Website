import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { format } from 'date-fns';
import { Search } from 'lucide-react';

export default function DiarySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const { diaryEntries } = useStore();

  const filteredEntries = searchTerm
    ? diaryEntries.filter(entry => 
        entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="retro-input pl-10 w-full"
          placeholder="Search diary entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {searchTerm && (
        <div className="space-y-4">
          <h3 className="font-medium">Search Results</h3>
          {filteredEntries.map(entry => (
            <div key={entry.id} className="retro-card">
              <div className="text-sm text-gray-500 mb-2">
                {format(new Date(entry.date), 'MMMM d, yyyy')}
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
          ))}
          {filteredEntries.length === 0 && (
            <p className="text-gray-500">No entries found</p>
          )}
        </div>
      )}
    </div>
  );
}