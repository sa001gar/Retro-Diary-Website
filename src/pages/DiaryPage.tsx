import React, { useState } from 'react';
import Calendar from '../components/calendar/Calendar';
import DiaryEditor from '../components/diary/DiaryEditor';
import DiaryList from '../components/diary/DiaryList';
import DiarySearch from '../components/diary/DiarySearch';
import DiaryStats from '../components/diary/DiaryStats';
import PageHeader from '../components/shared/PageHeader';

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = selectedDate.toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <PageHeader title="Diary" date={selectedDate} />
        <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
        <DiaryList date={formattedDate} />
        <DiaryEditor date={formattedDate} />
      </div>
      <div className="space-y-8">
        <DiarySearch />
        <DiaryStats />
      </div>
    </div>
  );
}