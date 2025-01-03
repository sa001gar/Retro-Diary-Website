import React from 'react';
import ProfileSettings from '../components/profile/ProfileSettings';
import NotificationSettings from '../components/profile/NotificationSettings';
import ThemeSettings from '../components/profile/ThemeSettings';
import PageHeader from '../components/shared/PageHeader';

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <PageHeader title="Profile Settings" date={new Date()} />
      
      {/* Profile Card */}
      <div className="retro-card bg-gradient-to-br from-[#ffd4e5] to-[#d4e5ff]">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">My Profile</h2>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ProfileSettings />
          <NotificationSettings />
        </div>
        <div>
          <ThemeSettings />
        </div>
      </div>
    </div>
  );
}