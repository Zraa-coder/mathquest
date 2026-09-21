import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../types';
import { Play, Zap, ChevronRight } from 'lucide-react';

export const Dashboard = ({ profile }: { profile: Profile | null }) => {
  if (!profile) return null;

  const currentLvlXp = (profile.level - 1) * 200;
  const nextLvlXp = profile.level * 200;
  const progressPercent = Math.min(100, Math.max(0, ((profile.xp - currentLvlXp) / 200) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-[#FF6FAE] to-[#65B7FF] rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-center shadow-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-black">Xin chào, {profile.full_name}! 👋</h1>
          <p className="text-white/80">Hôm nay bạn đã sẵn sàng chinh phục Toán THPT chưa?</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl">
          <span className="text-3xl">🔥</span>
          <div>
            <div className="text-2xl font-black">{profile.streak} Ngày</div>
            <div className="text-xs uppercase tracking-wider text-white/80">Chuỗi liên tiếp</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center font-bold">
          <span className="text-[#26354A] text-lg">Cấp độ hiện tại: <span className="text-[#FF6FAE]">Level {profile.level}</span></span>
          <span className="text-gray-400 text-sm">{profile.xp} / {nextLvlXp} XP</span>
        </div>
        <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
          <div className="bg-[#FF6FAE] h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-pink-100 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#26354A] flex items-center gap-2"><Play className="text-[#FF6FAE]"/> Bài học tiếp theo</h2>
            <Link to="/courses" className="text-sm font-bold text-[#FF6FAE] flex items-center">Xem tất cả <ChevronRight size={16}/></Link>
          </div>
          <div className="bg-[#FFE4F0]/40 p-4 rounded-2xl border border-pink-200 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-[#FF6FAE] uppercase">Toán 10 - Đại số</div>
              <div className="font-bold text-[#26354A]">Mệnh đề toán học là gì?</div>
            </div>
            <Link to="/courses" className="bg-[#FF6FAE] text-white px-4 py-2 rounded-xl font-bold text-sm">Học ngay</Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-blue-100 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#26354A] flex items-center gap-2"><Zap className="text-[#65B7FF]"/> Nhiệm vụ hôm nay</h2>
            <Link to="/quests" className="text-sm font-bold text-[#65B7FF] flex items-center">Chi tiết <ChevronRight size={16}/></Link>
          </div>
          <div className="bg-[#DDF3FF]/40 p-4 rounded-2xl border border-blue-200 flex justify-between items-center">
            <div>
              <div className="font-bold text-[#26354A]">Tân thủ chăm chỉ</div>
              <div className="text-xs text-gray-500">Hoàn thành 1 bài học (+50 XP)</div>
            </div>
            <span className="text-xs font-bold text-[#65B7FF] bg-white px-3 py-1 rounded-full">0/1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

