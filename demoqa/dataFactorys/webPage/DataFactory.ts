import { faker } from '@faker-js/faker';
//import type { User } from '../../pages/WebTablePage';
import type { User } from '../../models/User';

export function createUser(overrides = {}): User {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 60 }).toString(),
    salary: faker.number.int({ min: 1000, max: 10000 }).toString(),
    department: 'QA',
    ...overrides,
  };
}

export function createUsers(count: number): User[] {
  return Array.from({ length: count }, () => createUser());
}