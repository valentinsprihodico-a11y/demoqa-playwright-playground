import { test } from '@playwright/test';
import { WebTablesPage } from '../../../demoqa/pages/WebTablePage';
import { createUsers } from '../../../demoqa/dataFactorys/webPage/DataFactory';
import { createSameUsers } from '../../../demoqa/datas/staticUsersData';

test('bulk create users', async ({ page }) => {
    const webTables = new WebTablesPage(page);
    const users = createUsers(5);
    
    await webTables.open(); 
    await webTables.addUsers(users);
    //await webTables.expectUsersExist(users);
});

test('create a same user', async ({ page }) => {
    const webTables = new WebTablesPage(page);
    const users = createSameUsers(1);
    
    await webTables.open(); 
    await webTables.addUsers(users);
    //await webTables.expectUsersExist(users);

    //await webTables.expectUsersExist(users);
});