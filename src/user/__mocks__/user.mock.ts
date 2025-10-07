import { taskMock } from 'src/task/__mocks__/task.mock';
import { User, UserWithTasks } from '../types/user.type';

export const userMock: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date
};

export const userWithTasksMock: UserWithTasks = {
  ...userMock
};
