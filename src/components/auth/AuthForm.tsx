import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useStore } from '../../lib/store';
import { syncData } from '../../lib/sync';
import { Lock, Mail, LogIn } from 'lucide-react';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const setUser = useStore((state) => state.setUser);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          created_at: data.user.created_at,
        });
        await syncData();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="retro-card max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>
      <form onSubmit={handleAuth} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              className="retro-input pl-10 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              className="retro-input pl-10 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="retro-button w-full"
          disabled={loading}
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="mt-4 w-full retro-button bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </button>

      <p className="mt-4 text-center text-sm">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          className="text-blue-600 hover:underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}