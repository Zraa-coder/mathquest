import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lesson, QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { CheckCircle, HelpCircle, ArrowLeft } from 'lucide-react';

export const LessonPage = ({ userId, onXpEarned }: { userId: string; onXpEarned: () => void }) => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      const { data: lData } = await supabase.from('lessons').select('*').eq('id', lessonId).single();
      const { data: qData } = await supabase.from('quiz_questions').select('*').eq('lesson_id', lessonId);
      if (lData) setLesson(lData);
      if (qData) setQuizzes(qData);
    };
    fetchLesson();
  }, [lessonId]);

  const handleFinishLesson = async () => {
    if (!lesson) return;
    const { data } = await supabase.rpc('add_user_xp', { user_uuid: userId, amount: lesson.xp_reward });
    await supabase.from('progress').upsert({ user_id: userId, lesson_id: lesson.id, completed: true });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setCompleted(true);
    onXpEarned();

    if (data?.leveled_up) {
      alert(`🎉 CHÚC MỪNG! BẠN ĐÃ LÊN LEVEL ${data.level}!`);
    }
  };

  if (!lesson) return <div className="p-8 text-center">Đang tải bài học...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-500 mb-6 font-bold">
        <ArrowLeft size={18}/> Quay lại
      </button>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-pink-100 shadow-sm space-y-6">
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h1 className="text-2xl font-black text-[#26354A]">{lesson.title}</h1>
            <span className="text-xs font-bold text-[#FF6FAE] bg-[#FFE4F0] px-3 py-1 rounded-full">
              Thưởng: +{lesson.xp_reward} XP
            </span>
          </div>
        </div>

        <div className="prose max-w-none text-gray-700 space-y-4">
          <div dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>') }} />
        </div>

        {quizzes.length > 0 && (
          <div className="pt-6 border-t space-y-6">
            <h3 className="text-lg font-bold text-[#26354A] flex items-center gap-2"><HelpCircle className="text-[#65B7FF]"/> Câu hỏi luyện tập</h3>
            {quizzes.map((q, idx) => (
              <div key={q.id} className="bg-gray-50 p-4 rounded-2xl space-y-3">
                <p className="font-bold text-[#26354A]">Câu {idx + 1}: {q.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: oIdx })}
                      className={`p-3 text-left rounded-xl font-semibold border text-sm transition ${
                        selectedAnswers[q.id] === oIdx ? 'bg-[#DDF3FF] border-[#65B7FF] text-[#26354A]' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-6 flex justify-end">
          <button
            onClick={handleFinishLesson}
            disabled={completed}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition ${
              completed ? 'bg-green-500 cursor-not-allowed' : 'bg-[#FF6FAE] hover:bg-pink-600 shadow-md'
            }`}
          >
            <CheckCircle size={20}/> {completed ? 'Đã hoàn thành' : 'Hoàn thành bài học (+XP)'}
          </button>
        </div>
      </div>
    </div>
  );
};

