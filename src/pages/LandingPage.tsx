import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Sparkles } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="bg-[#FFE4F0]/30 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-pink-200 px-4 py-2 rounded-full text-[#FF6FAE] font-bold text-sm mb-6 shadow-sm">
          <Sparkles size={16}/> Nền tảng học Toán THPT Gamification số 1
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-[#26354A] leading-tight mb-6">
          Học Toán – Chinh phục thử thách <br/>
          <span className="text-[#FF6FAE]">Lên cấp mỗi ngày!</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          MathQuest biến các công thức Toán THPT khô khan thành những màn chơi hấp dẫn. Tích lũy XP, đua top Bảng xếp hạng và nhận quà tặng độc đáo!
        </p>
        <Link to="/auth" className="inline-flex items-center gap-2 bg-[#FF6FAE] text-white text-xl font-bold px-8 py-4 rounded-3xl shadow-lg hover:bg-pink-600 transition transform hover:-translate-y-1">
          <Rocket size={24}/> Bắt đầu ngay (Miễn phí)
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
          <div className="bg-[#FFE4F0] w-12 h-12 rounded-2xl flex items-center justify-center text-[#FF6FAE] font-bold text-2xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-[#26354A] mb-2">Chuẩn Bổ Giáo Dục</h3>
          <p className="text-gray-500">Đầy đủ kiến thức Toán 10, 11 và 12 bám sát đề thi THPT Quốc Gia.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm">
          <div className="bg-[#DDF3FF] w-12 h-12 rounded-2xl flex items-center justify-center text-[#65B7FF] font-bold text-2xl mb-4">🎮</div>
          <h3 className="text-xl font-bold text-[#26354A] mb-2">Học Như Chơi Game</h3>
          <p className="text-gray-500">Nhận XP khi làm bài đúng, lên Level, mua vật phẩm trang trí Profile cực cool.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm">
          <div className="bg-purple-100 w-12 h-12 rounded-2xl flex items-center justify-center text-purple-600 font-bold text-2xl mb-4">🏆</div>
          <h3 className="text-xl font-bold text-[#26354A] mb-2">Đua Top Bang Hội</h3>
          <p className="text-gray-500">Thi đua cùng hàng ngàn học sinh THPT trên toàn quốc mỗi tuần.</p>
        </div>
      </section>
    </div>
  );
};

