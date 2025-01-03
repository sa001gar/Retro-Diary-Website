import React from 'react';
import { useStore } from '../../lib/store';
import { supabase } from '../../lib/supabase';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSettings() {
  const { user, setUser } = useStore();
  const currentTheme = user?.profile?.theme_preference || 'light';

  const handleThemeChange = async (theme: 'light' | 'dark') => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        theme_preference: theme,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!error && data) {
      setUser({ ...user, profile: { ...user.profile, theme_preference: theme } });
    }
  };

  return (
    <div className="retro-card">
      <h2 className="text-xl font-semibold mb-6">Theme Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleThemeChange('light')}
          className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 ${
            currentTheme === 'light'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Sun className="h-6 w-6" />
          <span>Light Mode</span>
        </button>

        <button
          onClick={() => handleThemeChange('dark')}
          className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 ${
            currentTheme === 'dark'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Moon className="h-6 w-6" />
          <span>Dark Mode</span>
        </button>
      </div>
    </div>
  );
}