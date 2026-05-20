import { test, expect } from '@playwright/test';

const textBoxTestData = {
    name: 'John Doe',
    email: 'john@example.com',
    incorrectEmail: 'john@example.comcom',
    currentAddress: 'Some Current Address',
    permanentAddress: 'Some Permanent Address'  
};

const textBoxLocators = {
    nameInput: '#userName',
    emailInput: '#userEmail',
    currentAddressInput: '#currentAddress',
    permanentAddressInput: '#permanentAddress',
    submitButton: '#submit'
};

test('Text Box form should submit data correctly', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  await page.locator(textBoxLocators.nameInput).fill(textBoxTestData.name);
  await page.locator(textBoxLocators.emailInput).fill(textBoxTestData.email);
  await page.locator(textBoxLocators.currentAddressInput).fill(textBoxTestData.currentAddress);
  await page.locator(textBoxLocators.permanentAddressInput).fill(textBoxTestData.permanentAddress);

  await page.locator(textBoxLocators.submitButton).click();

  const outputName = page.locator('#name');
  const outputEmail = page.locator('#email');

  await expect(outputName).toContainText(textBoxTestData.name);
  await expect(outputEmail).toContainText(textBoxTestData.email);
});

test('should not submit invalid email and no output appears', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  await page.locator(textBoxLocators.nameInput).fill('John');
  await page.locator(textBoxLocators.emailInput).fill('invalid-email');

  await page.locator(textBoxLocators.submitButton).click();

  const outputEmail = page.locator('#email');
  const emailInput = page.locator(textBoxLocators.emailInput);
  
  await expect(emailInput).toHaveClass(/field-error/);
  await expect(outputEmail).not.toBeVisible();
});