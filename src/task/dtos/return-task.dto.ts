import { Task } from "../types/task.type";

export class ReturnTaskDto {
  id: number;
  title: string;
  description: string;
  status: string;
  userId: number;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.userId = task.userId;
  };
};