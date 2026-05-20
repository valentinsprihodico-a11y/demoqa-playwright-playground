import { Page, Locator, expect } from '@playwright/test';

export class TextBoxPage {
  readonly page: Page;

  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly outputName: Locator;
  readonly outputEmail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'Full Name' });
    this.emailInput = page.getByRole('textbox', { name: 'name@example.com' })
    this.currentAddressInput = page.getByRole('textbox', { name: 'Current Address' })
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.outputName = page.locator('#name');
    this.outputEmail = page.locator('#email');
  }

  async open() {
    await this.page.goto('https://demoqa.com/text-box');
  }

  async fillForm(data: {
    name: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.currentAddressInput.fill(data.currentAddress);
    await this.permanentAddressInput.fill(data.permanentAddress);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectSuccess(data: { name: string; email: string }) {
    await expect(this.outputName).toContainText(data.name);
    await expect(this.outputEmail).toContainText(data.email);
  }

  async expectEmailError() {
    await expect(this.emailInput).toHaveClass(/field-error/);
  }
}