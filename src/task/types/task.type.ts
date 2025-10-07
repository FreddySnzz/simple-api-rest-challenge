export type TaskStatus = 'pending' | 'done';

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  userId: number;
  createdAt: Date;
};