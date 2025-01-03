import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { supabase } from '../../lib/supabase';
import { Bell } from 'lucide-react';

export default function NotificationSettings() {
  const { user, setUser } = useStore();
  const [preferences, setPreferences] = useState({
    email: user?.profile?.notification_preferences?.email ?? true,
    push: user?.profile?.notification_preferences?.push ?? true,
  });

  const handleToggle = async (type: 'email' | 'push') => {
    if (!user) return;

    const newPreferences = {
      ...preferences,
      [type]: !preferences[type],
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        notification_preferences: newPreferences,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!error && data) {
      setPreferences(newPreferences);
      setUser({ ...user, profile: { ...user.profile, notification_preferences: newPreferences } });
    }
  };

  return (
    <div className="retro-card">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Notification Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive updates via email</p>
          </div>
          <button
            onClick={() => handleToggle('email')}
            className={`w-12 h-6 rounded-full transition-colors ${
              preferences.email ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                preferences.email ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Push Notifications</h3>
            <p className="text-sm text-gray-500">Receive push notifications</p>
          </div>
          <button
            onClick={() => handleToggle('push')}
            className={`w-12 h-6 rounded-full transition-colors ${
              preferences.push ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                preferences.push ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}