import { test } from '@playwright/test';
import { WebTablesPage } from '../../../demoqa/pages/WebTablePage';
import { createUsers } from '../../../demoqa/dataFactorys/webPage/DataFactory';

test('bulk create users', async ({ page }) => {
    const webTables = new WebTablesPage(page);
    const users = createUsers(5);
    
    await webTables.open(); 
    await webTables.addUsers(users);
    //await webTables.expectUsersExist(users);
});