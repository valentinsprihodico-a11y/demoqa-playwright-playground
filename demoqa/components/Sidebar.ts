import { Page, Locator } from '@playwright/test';

export class Sidebar {
  readonly page: Page;
  readonly elementsSection: Locator;
  readonly textBoxLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.elementsSection = page.locator('.left-pannel');
    //this.textBoxLink = page.locator('text=Text Box');
    this.textBoxLink = page.getByRole('link', { name: 'Text Box' })
  }

  async openTextBox() {
    await this.textBoxLink.click();
  }
}