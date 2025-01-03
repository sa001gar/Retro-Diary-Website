import React from 'react';
import { BookOpen, Calendar, Shield, ArrowRight, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';

export default function LandingPage() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  const handleGetStarted = () => {
    if (user) {
      navigate('/diary');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffefd5] to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ffd4e5] to-[#d4e5ff]">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rotate-45 bg-white rounded-lg" />
            <div className="absolute bottom-10 right-10 w-16 h-16 rotate-12 bg-white rounded-full" />
          </div>

          <h1 className="text-6xl font-bold mb-6 text-gray-800">
            Retro Diary
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Your personal space for memories and plans, with a touch of nostalgia
          </p>
          <button 
            onClick={handleGetStarted}
            className="retro-button text-lg px-8 py-4 flex items-center space-x-2 mx-auto
                     hover:scale-105 transform transition-all duration-300"
          >
            <span>Get Started Today</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Amazing Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Digital Diary"
            description="Record your daily thoughts, memories, and experiences in a beautiful retro-styled interface."
            color="bg-[#ffd4e5]"
          />
          <FeatureCard
            icon={<Calendar className="h-8 w-8" />}
            title="Daily Planner"
            description="Organize your tasks and schedule with our intuitive planning tools."
            color="bg-[#d4e5ff]"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Secure & Private"
            description="Your data is encrypted and protected. Only you can access your entries."
            color="bg-[#ffefd5]"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-b from-white to-[#ffefd5] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              text="The perfect blend of modern functionality and retro aesthetics. I love it!"
              author="Sarah J."
              role="Daily User"
            />
            <TestimonialCard
              text="Finally, a diary app that feels personal and secure. Exactly what I needed."
              author="Michael R."
              role="Professional Writer"
            />
            <TestimonialCard
              text="The planning features have helped me stay organized like never before."
              author="Emily T."
              role="Student"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#ffd4e5] to-[#d4e5ff]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Retro Diary</h3>
              <p className="text-gray-700">Your digital companion for memories and planning.</p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={handleGetStarted} className="text-gray-700 hover:text-gray-900">Get Started</button></li>
                <li><a href="#features" className="text-gray-700 hover:text-gray-900">Features</a></li>
                <li><a href="#testimonials" className="text-gray-700 hover:text-gray-900">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Contact</h3>
              <p className="text-gray-700">Questions? Reach out to us at support@retrodiary.app</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  <Star className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  <Heart className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-700">
            <p>&copy; {new Date().getFullYear()} Retro Diary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
}) {
  return (
    <div className="retro-card hover:scale-105 transform transition-all duration-300">
      <div className={`inline-block p-4 ${color} rounded-full mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TestimonialCard({ text, author, role }: {
  text: string;
  author: string;
  role: string;
}) {
  return (
    <div className="retro-card hover:scale-105 transform transition-all duration-300">
      <div className="text-gray-600 mb-4">{text}</div>
      <div className="border-t pt-4">
        <div className="font-bold">{author}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  );
}