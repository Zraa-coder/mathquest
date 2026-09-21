import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';
import { Trophy } from 'lucide-react';

export const Leaderboard = () => {
  const [leaders, setLeaders] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase.from('profiles').select('*').order('xp', { ascending: false }).limit(10);
      if (data) setLeaders(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-black text-[#26354A] text-center flex items-center justify-center gap-2">
        <Trophy className="text-yellow-500"/> Bảng Xếp Hạng Cao Thủ
      </h1>

      <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm">
        {leaders.map((user, idx) => (
          <div key={user.id} className={`flex items-center justify-between p-4 border-b last:border-b-0 ${idx < 3 ? 'bg-pink-50/30' : ''}`}>
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 flex items-center justify-center font-black rounded-full ${
                idx === 0 ? 'bg-yellow-400 text-white' : idx === 1 ? 'bg-gray-300 text-white' : idx === 2 ? 'bg-amber-600 text-white' : 'text-gray-400'
              }`}>
                {idx + 1}
              </span>
              <img src={user.avatar_url} alt="" className="w-10 h-10 rounded-full border" />
              <div>
                <div className="font-bold text-[#26354A]">{user.full_name}</div>
                <div className="text-xs text-gray-400">Level {user.level}</div>
              </div>
            </div>
            <div className="font-black text-[#FF6FAE]">⭐ {user.xp} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
};

