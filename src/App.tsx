import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthForm from './components/auth/AuthForm';
import DiaryPage from './pages/DiaryPage';
import PlannerPage from './pages/PlannerPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import { useStore } from './lib/store';
import { syncData } from './lib/sync';
import './styles/theme.css';

function App() {
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (user) {
      syncData();
    }
  }, [user]);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/diary" replace />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/diary" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;