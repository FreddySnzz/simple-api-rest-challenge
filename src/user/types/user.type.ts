import { Task } from "../../task/types/task.type";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

export type UserWithTasks = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};