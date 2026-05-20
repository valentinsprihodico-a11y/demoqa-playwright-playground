import { test, expect } from '@playwright/test';

test('Text Box form should submit data correctly', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  await page.locator('#userName').fill('John Doe');
  await page.locator('#userEmail').fill('john@example.com');
  await page.locator('#currentAddress').fill('Some Current Address');
  await page.locator('#permanentAddress').fill('Some Permanent Address');

  await page.locator('#submit').click();

  const outputName = page.locator('#name');
  const outputEmail = page.locator('#email');

  await expect(outputName).toContainText('John Doe');
  await expect(outputEmail).toContainText('john@example.com');
});