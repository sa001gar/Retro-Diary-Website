import React, { useState } from 'react';
import { Calendar, BookOpen, ListTodo, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileMenu from './shared/ProfileMenu';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white border-r-2 border-gray-200 p-4
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Retro Diary</h1>
            <button 
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <NavItem to="/diary" icon={<Calendar size={20} />} label="Calendar" onClick={() => setIsSidebarOpen(false)} />
            <NavItem to="/diary" icon={<BookOpen size={20} />} label="Diary" onClick={() => setIsSidebarOpen(false)} />
            <NavItem to="/planner" icon={<ListTodo size={20} />} label="Planner" onClick={() => setIsSidebarOpen(false)} />
            <NavItem to="/profile" icon={<User size={20} />} label="Profile" onClick={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b-2 border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="md:hidden font-bold">Retro Diary</div>
            <ProfileMenu />
          </div>
        </header>

        <main className="flex-1 bg-[#ffefd5] overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function NavItem({ to, icon, label, onClick }: NavItemProps) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 w-full px-4 py-2 rounded-md
                hover:bg-[#ffefd5] transition-colors duration-300"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}