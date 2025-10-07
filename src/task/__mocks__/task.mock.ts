import { Task } from "../types/task.type";

export const taskMock: Task = {
  id: 1,
  title: "Implementar autenticação JWT",
  description: "Adicionar autenticação JWT no módulo de usuários",
  status: "PENDING",
  userId: 1,
  createdAt: new Date(),
};
