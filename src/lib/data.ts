import type { User, Badge, LearningModule } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const badges: Badge[] = [
  { id: 'b1', name: 'Python Pro', icon: getImage('badge-python'), description: 'Mastered the basics of Python.' },
  { id: 'b2', name: 'Onboarding Complete', icon: getImage('badge-onboarding'), description: 'Completed all general onboarding tasks.' },
  { id: 'b3', name: 'Fast Learner', icon: getImage('badge-fast-learner'), description: 'Completed 3 modules in the first week.' },
];

export const user: User = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  department: 'Engineering',
  avatar: getImage('user-avatar'),
  points: 1250,
  badges: [badges[0], badges[1], badges[2]],
};

export const learningModules: LearningModule[] = [
  {
    id: 'lm1',
    title: 'Welcome to the Company',
    description: 'Learn about our mission, vision, and values. Get to know the team and our culture.',
    department: 'General',
    progress: 100,
    points: 100,
  },
  {
    id: 'lm2',
    title: 'Tools & Software Setup',
    description: 'A guide to setting up your development environment, communication tools, and more.',
    department: 'General',
    progress: 100,
    points: 150,
  },
  {
    id: 'lm3',
    title: 'Introduction to our Tech Stack',
    description: 'An overview of the technologies we use to build our products.',
    department: 'Engineering',
    progress: 75,
    points: 200,
  },
  {
    id: 'lm4',
    title: 'Frontend Best Practices',
    description: 'Deep dive into our frontend architecture, component library, and state management.',
    department: 'Engineering',
    progress: 40,
    points: 250,
  },
  {
    id: 'lm5',
    title: 'Design System Fundamentals',
    description: 'Understand the principles and components of our design system.',
    department: 'Design',
    progress: 90,
    points: 200,
  },
  {
    id: 'lm6',
    title: 'User Research Methodologies',
    description: 'Learn how we conduct user research to inform our product decisions.',
    department: 'Product',
    progress: 20,
    points: 200,
  },
];
