import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../../../demoqa/pages/WebTablePage';
import { createUser } from '../../../demoqa/dataFactorys/webPage/DataFactory';

test.skip('create + verify + delete user', async ({ page }) => {
  const table = new WebTablesPage(page);

  const user = createUser();

  await table.open();
  await table.addUser(user);
  await page.waitForTimeout(2000);

  const userRow = await table.findUserByEmail(user.email);

  const data = await userRow.getData();

  expect(data.email).toBe(user.email);
  expect(data.firstName).toBe(user.firstName);

  await userRow.delete();

  await expect(page.getByText(user.email)).toHaveCount(0);
});