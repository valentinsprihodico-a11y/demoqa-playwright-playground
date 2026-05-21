import { Page, expect, Locator } from '@playwright/test';
import { UserRow } from '../models/UserRow';
import type { User } from '../models/User';

export class WebTablesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://demoqa.com/webtables');
  }

  // 🔍 базовый поиск строки (stabilized)
  private getRows(): Locator {
    const l = this.page.locator('.rt-tbody .rt-tr-group');
    return l
  }

  // 🧠 НАЙТИ ПЕРВУЮ ПОДХОДЯЩУЮ СТРОКУ
  async findUserByEmail(email: string): Promise<UserRow> {
    const row = this.getRows().filter({
      has: this.page.getByText(email, { exact: true }),
    }).first();

    await expect(row).toBeVisible();

    return new UserRow(row);
  }

  // 🧠 fallback поиск (если email дублируется или скрыт)
  async findFirstMatchingUser(email: string): Promise<UserRow | null> {
    const rows = this.getRows();
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const text = await row.textContent();

      if (text?.includes(email)) {
        return new UserRow(row);
      }
    }

    return null;
  }

  // ➕ create
  async addUser(user: User) {
    await this.page.getByRole('button', { name: 'Add' }).click();

    await this.page.getByPlaceholder('First Name').fill(user.firstName);
    await this.page.getByPlaceholder('Last Name').fill(user.lastName);
    await this.page.getByPlaceholder('name@example.com').fill(user.email);
    await this.page.getByPlaceholder('Age').fill(user.age);
    await this.page.getByPlaceholder('Salary').fill(user.salary);
    await this.page.getByPlaceholder('Department').fill(user.department);

    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  // 🔎 check existence (упрощённый уровень)
  async expectUserExists(email: string) {
    await expect(this.page.getByText(email)).toBeVisible();
  }
}