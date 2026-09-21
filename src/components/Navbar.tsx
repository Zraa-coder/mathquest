import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Award, ShoppingBag, Trophy, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';

export const Navbar = ({ profile }: { profile: Profile | null }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-pink-100 sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={profile ? "/dashboard" : "/"} className="flex items-center gap-2 text-2xl font-black text-[#FF6FAE]">
          <span className="bg-[#FFE4F0] p-2 rounded-2xl">📐</span> MathQuest
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-[#26354A] font-semibold">
          {profile && (
            <>
              <Link to="/courses" className="flex items-center gap-1 hover:text-[#FF6FAE]"><BookOpen size={18}/> Khóa học</Link>
              <Link to="/quests" className="flex items-center gap-1 hover:text-[#FF6FAE]"><Award size={18}/> Nhiệm vụ</Link>
              <Link to="/shop" className="flex items-center gap-1 hover:text-[#FF6FAE]"><ShoppingBag size={18}/> Cửa hàng</Link>
              <Link to="/leaderboard" className="flex items-center gap-1 hover:text-[#FF6FAE]"><Trophy size={18}/> Bảng xếp hạng</Link>
            </>
          )}
        </div>

        {/* Profile Stats */}
        <div className="hidden md:flex items-center gap-4">
          {profile ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-[#FFE4F0] text-[#FF6FAE] px-3 py-1 rounded-full text-sm font-bold">
                <Flame size={16} fill="#FF6FAE"/> {profile.streak} ngày
              </div>
              <div className="bg-[#DDF3FF] text-[#65B7FF] px-3 py-1 rounded-full text-sm font-bold">
                ⭐ {profile.xp} XP
              </div>
              <Link to="/profile">
                <img src={profile.avatar_url} alt="Avatar" className={`w-9 h-9 rounded-full border-2 ${profile.frame_url || 'border-pink-300'}`} />
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500"><LogOut size={18}/></button>
            </div>
          ) : (
            <Link to="/auth" className="bg-[#FF6FAE] text-white px-5 py-2 rounded-2xl font-bold shadow-md hover:bg-pink-600 transition">
              Đăng nhập
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-[#26354A]" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile Menu Expanded */}
      {mobileOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3 font-semibold text-[#26354A]">
          {profile ? (
            <>
              <div className="flex justify-around bg-pink-50 p-2 rounded-xl mb-2">
                <span className="text-[#FF6FAE] font-bold">🔥 {profile.streak} Ngày</span>
                <span className="text-[#65B7FF] font-bold">⭐ {profile.xp} XP</span>
                <span className="text-purple-600 font-bold">Lvl {profile.level}</span>
              </div>
              <Link to="/courses" onClick={() => setMobileOpen(false)}>Khóa học</Link>
              <Link to="/quests" onClick={() => setMobileOpen(false)}>Nhiệm vụ</Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)}>Cửa hàng</Link>
              <Link to="/leaderboard" onClick={() => setMobileOpen(false)}>Bảng xếp hạng</Link>
              <button onClick={handleLogout} className="text-red-500 text-left py-1">Đăng xuất</button>
            </>
          ) : (
            <Link to="/auth" className="bg-[#FF6FAE] text-white py-2 rounded-xl text-center font-bold">Đăng nhập / Đăng ký</Link>
          )}
        </div>
      )}
    </nav>
  );
};

