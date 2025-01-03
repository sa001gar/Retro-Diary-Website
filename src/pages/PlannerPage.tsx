import React, { useState } from 'react';
import Calendar from '../components/calendar/Calendar';
import TaskList from '../components/planner/TaskList';
import TaskForm from '../components/planner/TaskForm';
import PageHeader from '../components/shared/PageHeader';

export default function PlannerPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = selectedDate.toISOString().split('T')[0];

  return (
    <div className="space-y-8">
      <PageHeader title="Daily Planner" date={selectedDate} />
      <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
      <TaskForm date={formattedDate} />
      <TaskList date={formattedDate} />
    </div>
  );
}