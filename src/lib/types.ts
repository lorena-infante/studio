export type User = {
  name: string;
  email: string;
  department: 'Engineering' | 'Design' | 'Product';
  avatar: string;
  points: number;
  badges: Badge[];
};

export type Badge = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type LearningModule = {
  id: string;
  title: string;
  description: string;
  department: 'Engineering' | 'Design' | 'Product' | 'General';
  progress: number; // 0-100
  points: number;
};
