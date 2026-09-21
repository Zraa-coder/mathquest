import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Profile } from './types';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { LessonPage } from './pages/LessonPage';
import { ShopPage } from './pages/ShopPage';
import { Leaderboard } from './pages/Leaderboard';
import { AuthPage } from './pages/AuthPage';

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(data);
    } else {
      setProfile(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  if (loading) return <div className="p-8 text-center">Đang tải MathQuest...</div>;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FAF9F6] font-sans">
        <Navbar profile={profile} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={!profile ? <AuthPage /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={profile ? <Dashboard profile={profile} /> : <Navigate to="/auth" />} />
          <Route path="/lesson/:lessonId" element={profile ? <LessonPage userId={profile.id} onXpEarned={fetchProfile} /> : <Navigate to="/auth" />} />
          <Route path="/shop" element={profile ? <ShopPage profile={profile} onUpdateProfile={fetchProfile} /> : <Navigate to="/auth" />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

