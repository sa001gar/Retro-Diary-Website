import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useStore } from '../../lib/store';

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      navigate('/');
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#ffefd5] transition-colors duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-[#d4e5ff] flex items-center justify-center">
          <User size={18} />
        </div>
        <span className="text-sm font-medium">{user?.email}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border-2 border-gray-200">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/profile');
            }}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#ffefd5]"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}