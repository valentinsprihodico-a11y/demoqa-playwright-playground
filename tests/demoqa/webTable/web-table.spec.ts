import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../../../demoqa/pages/WebTablePage';
import { createUsers } from '../../../demoqa/dataFactorys/webPage/DataFactory';
import { createSameUsers } from '../../../demoqa/datas/staticUsersData';

// test('bulk create users', async ({ page }) => {
//     const webTables = new WebTablesPage(page);
//     const users = createUsers(5);
    
//     await webTables.open(); 
//     await webTables.addUsers(users);
//     //await webTables.expectUsersExist(users);
// });

test('create a same user', async ({ page }) => {


    const webTables = new WebTablesPage(page);
    const users = createSameUsers(1);
    

// await page.waitForTimeout(3000);

// //const table = page.locator('table');

// const table = page.locator('table').filter({
//   has: page.locator('thead th', { hasText: 'Age' })
// });


// const rows = await table.locator('tr').all();

// const tableData = [];
// for (const row of rows) {
//   const cells = await row.locator('td').allTextContents();
//   tableData.push(cells);
// }



//  const count = await table.count();
//  console.log(tableData);

















//     table.filter({
//         has: page.getByText('Department') // замени на свой заголовок
//     });


//     table.filter({
//         has: page.getByText('Age') // замени на свой заголовок
//     });

    


//     await page.waitForTimeout(3000);

//     await expect(table).toBeVisible();
//     console.log('Table is visible');


//     const header = table.locator('thead');
//     await expect(header).toBeVisible();

//     console.log('Header text:', await header.innerText());

    
//     //await webTables.addUsers(users);
//     await webTables.expectUsersExist(users);
});



//   await page.goto('https://your-url');

//   // стабильный локатор через роль + заголовок
//   const table = page.getByRole('table').filter({
//     has: page.getByText('Users')
//   });

//   await expect(table).toBeVisible();

//   // пример: взять все строки
//   const rows = table.locator('tbody tr');
//   const count = await rows.count();

//   console.log('Rows:', count);
