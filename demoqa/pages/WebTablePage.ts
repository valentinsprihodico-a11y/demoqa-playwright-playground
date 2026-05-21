import { Page, Locator, expect } from '@playwright/test';
import type { User } from '../models/User';

export class WebTablesPage {
  readonly page: Page;

  // ===== LOCATORS =====
  readonly addButton: Locator;
  readonly searchInput: Locator;

  readonly nextButton: Locator;
  readonly prevButton: Locator;
  readonly rowsSelect: Locator;
  //
  readonly table: Locator;

  //readonly firsNameInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addButton = page.locator('#addNewRecordButton');
    this.searchInput = page.locator('#searchBox');

    this.nextButton = page.locator('.-next .-btn');
    this.prevButton = page.locator('.-previous .-btn');

    this.rowsSelect = page.locator('select[aria-label="rows per page"]');
    //
    this.table = page.getByRole('table');
  }

  // ===== NAVIGATION =====
  async open() {
    await this.page.goto('https://demoqa.com/webtables', {
      waitUntil: 'domcontentloaded',
    });
  }

  // ===== SEARCH =====
  async search(value: string) {
    await this.searchInput.fill(value);
  }

  async clearSearch() {
    await this.searchInput.fill('');
  }

  // ===== TABLE ROW HELPERS =====
  getRow(text: string) {
    return this.page.locator('.rt-tr-group', { hasText: text });
    //return this.page.locator(this.firsNameInput, { hasText: text });
 
  }

  async expectRowVisible(text: string) {
    await expect(this.getRow(text)).toBeVisible();
  }

  // ===== ACTIONS =====
  async deleteUser(text: string) {
    await this.getRow(text)
      .locator('[title="Delete"]')
      .click();
  }

  async editUser(text: string) {
    await this.getRow(text)
      .locator('[title="Edit"]')
      .click();
  }

  // ===== PAGINATION =====
  async nextPage() {
    await this.nextButton.click();
  }

  async prevPage() {
    await this.prevButton.click();
  }

  async setRowsPerPage(value: string) {
    await this.rowsSelect.selectOption(value);
  }

  // ===== CREATE USER =====
  async addUser(user: User) {
    await this.addButton.click();

    await this.page.fill('#firstName', user.firstName);
    await this.page.fill('#lastName', user.lastName);
    await this.page.fill('#userEmail', user.email);
    await this.page.fill('#age', user.age);
    await this.page.fill('#salary', user.salary);
    await this.page.fill('#department', user.department);

    await this.page.click('#submit');
  }

  // ===== MASS FILL (ТО, ЧТО ТЫ ХОТЕЛ) =====
  async addUsers(users: User[]) {
    for (const user of users) {
      await this.addUser(user);
    }
  }

  // ===== SIMPLE CHECK =====
  async expectUsersExist(users: User[]) {
    for (const user of users) {
      await this.expectRowVisible(user.firstName);
    }
  }
}