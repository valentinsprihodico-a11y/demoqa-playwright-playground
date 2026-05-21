import { Locator, expect } from '@playwright/test';
import type { User } from './User';

export class UserRow {
  constructor(private readonly row: Locator) {}

  async getData(): Promise<User> {
    const cells = this.row.locator('.rt-td');

    return {
      firstName: (await cells.nth(0).textContent()) ?? '',
      lastName: (await cells.nth(1).textContent()) ?? '',
      email: (await cells.nth(2).textContent()) ?? '',
      age: (await cells.nth(3).textContent()) ?? '',
      salary: (await cells.nth(4).textContent()) ?? '',
      department: (await cells.nth(5).textContent()) ?? '',
    };
  }

  async expectMatches(expected: Partial<User>) {
    const data = await this.getData();

    for (const [key, value] of Object.entries(expected)) {
      expect(data[key as keyof User]).toBe(value);
    }
  }

  async delete() {
    await this.row.getByTitle('Delete').click();
  }

  async edit() {
    await this.row.getByTitle('Edit').click();
  }
}