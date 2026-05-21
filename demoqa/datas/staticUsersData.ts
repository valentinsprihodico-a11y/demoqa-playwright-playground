import type { User } from '../models/User';

export const baseUser: User = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@test.com',
  age: '30',
  salary: '5000',
  department: 'QA',
};

export function createSameUsers(count: number): User[] {
  return Array.from({ length: count }, () => ({
    ...baseUser,
  }));
}