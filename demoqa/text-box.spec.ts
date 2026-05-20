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

test.describe('Test Box', () => {

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

test.fixme('Text Box - email validation state should update correctly', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  const nameInput = page.locator(textBoxLocators.nameInput);
  const emailInput = page.locator(textBoxLocators.emailInput);
  const currentAddressInput = page.locator(textBoxLocators.currentAddressInput);
  const permanentAddressInput = page.locator(textBoxLocators.permanentAddressInput);
  const submitBtn = page.locator(textBoxLocators.submitButton);

  const outputEmail = page.locator('#email');
  const outputName = page.locator('#name');

  // 1. Fill valid data
  await nameInput.fill('John Doe');
  await emailInput.fill('john@example.com');
  await currentAddressInput.fill('Some Current Address');
  await permanentAddressInput.fill('Some Permanent Address');

  // 2. Submit valid form
  await submitBtn.click();

  // 3. Verify success output exists
  await expect(outputName).toContainText('John Doe');
  await expect(outputEmail).toContainText('john@example.com');

  // 4. Change email to invalid
  await emailInput.fill('invalid-email');

  // 5. Try submit again
  await submitBtn.click();

  // 6. Assert validation state (UI feedback)
  await expect(emailInput).toHaveClass(/field-error/);

  // 7. Ensure output is NOT updated with invalid data
  await expect.soft(emailInput).toHaveValue('');
});
});