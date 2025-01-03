import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { supabase } from '../../lib/supabase';
import { User as UserIcon, Phone, FileText } from 'lucide-react';

export default function ProfileSettings() {
  const { user, setUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.profile?.full_name || '',
    phone: user?.profile?.phone || '',
    bio: user?.profile?.bio || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        ...formData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!error && data) {
      setUser({ ...user, profile: data });
      setIsEditing(false);
    }
  };

  return (
    <div className="retro-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="retro-button px-4 py-2"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="retro-input pl-10 w-full"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                className="retro-input pl-10 w-full"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <textarea
                className="retro-input pl-10 w-full h-24"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself"
              />
            </div>
          </div>

          <button type="submit" className="retro-button w-full">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Full Name</label>
            <p className="mt-1">{user?.profile?.full_name || 'Not set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Phone Number</label>
            <p className="mt-1">{user?.profile?.phone || 'Not set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Bio</label>
            <p className="mt-1 whitespace-pre-wrap">{user?.profile?.bio || 'Not set'}</p>
          </div>
        </div>
      )}
    </div>
  );
}