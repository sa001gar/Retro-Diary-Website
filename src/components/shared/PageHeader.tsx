import React from 'react';
import { format } from 'date-fns';

interface PageHeaderProps {
  title: string;
  date: Date;
}

export default function PageHeader({ title, date }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600">
        {format(date, 'EEEE, MMMM d, yyyy')}
      </p>
    </div>
  );
}