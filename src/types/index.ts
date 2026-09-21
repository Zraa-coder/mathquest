export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  frame_url?: string;
  xp: number;
  level: number;
  streak: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  grade: number;
  subject: string;
  thumbnail: string;
  instructor: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string;
  xp_reward: number;
}

export interface QuizQuestion {
  id: string;
  lesson_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: 'frame' | 'badge' | 'title';
  price: number;
  image_url: string;
}

