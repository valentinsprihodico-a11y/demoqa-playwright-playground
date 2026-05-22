import {test, expect, Page} from '@playwright/test';

const getTable = (page: Page) => page.locator('#simpletable');

test.beforeEach(async ({ page }) => {
    await page.goto('https://letcode.in/table');
    const table = getTable(page);
});

test.describe('Simple Table Tests', () => {
    test('table contains expected data', async ({ page }) => {
        let expectedResult;
        let currentResult = '';
        
        const rowaWithHeders = getTable(page).locator('tbody tr');


        for (let i = 0; i < await rowaWithHeders.count(); i++) {
            currentResult = await rowaWithHeders.nth(i).textContent();
            console.log(`Row ${i}: ${currentResult}` + ' ');
        }

        expect(expectedResult).toEqual(currentResult);
        console.log(currentResult);
    });
    
    test('header and data to input', async ({ page }) => {
        const rowaWithHeders = getTable(page).locator('tr');    
        for (let i = 0; i < await rowaWithHeders.count(); i++) {
            const rowText = await rowaWithHeders.nth(i).textContent();
            console.log(`Row ${i}: ${rowText}` + ' ');
        }
    });

    test('input Headers in column', async ({ page }) => {   
        const headers = getTable(page).locator('th');
        const headerCount = await headers.count();
        console.log('   Header count: ' + headerCount);
        for (let i = 0; i < headerCount; i++) {
            console.log(await headers.nth(i).textContent());
        }
        console.log('----------------------------- Headers in Column:');
    });

    test('All headers in row', async ({ page }) => {   
        const headersInRow = getTable(page).locator('tr').first().locator('th');                              ////?????
        //const headersInRow = getTable(page).locator('thead');                                ////?????
        console.log('Headers in Row: ' + (await headersInRow.allTextContents()).join(', '));
        console.log('----------------------------- Row with Headers:');
    });

    test('a lot of tests', async ({ page }) => { 
        //tr - table row - locator, nth(0) - first row, locator('th') - headers in the first row
        const rows = getTable(page).locator('tr');
        console.log('Rows count:' + await rows.count());
        console.log('----------------------------- Rows Count:');
        console.log();

        for (let i = 0; i < await rows.count(); i++) {
            console.log(await rows.nth(i).textContent() + ' ');
        }
        console.log('----------------------------- Row by row:');
        console.log();

        //td - table data, locator('td') - all data in the table
        const allData = getTable(page).locator('td');
        console.log('Data count:' + await allData.count() );
        console.log('----------------------------- All Data Count:');
        console.log();

        
        const firstRowData = getTable(page).locator('td');
        console.log('First row data:');
        for (let i = 0; i < await firstRowData.count(); i++) {
            console.log(await firstRowData.nth(i).textContent());
        }
        console.log('----------------------------- All Data Count:');
        console.log();

        const rowsByTableData = getTable(page).locator('tr');
        //const rowsByTableData = getTable(page).locator('dbody tr');
        console.log('Rows by table data:');
        const rowCount = await rowsByTableData.count();
        console.log('Row count:' + rowCount);
        for (let i = 0; i < rowCount; i++) {
            const rowData = rowsByTableData.nth(i).locator('td');
            const rowText = await rowData.allTextContents();
            console.log(`Row ${i + 1}: ${rowText.join(', ')}`);
        }
        console.log('----------------------------- Row by Row with Table Data:');
    ///////////////////////////////////////////////////////////////////////////////////////
    });

    test("work with tbody of Users (second) table", async ({ page }) => { 
        const tBotyTr = getTable(page).locator('tbody tr');
        console.log('Rows in tbody:' + await tBotyTr.count());
        //const tBodyRowCount = await tBotyTr.count();
        const colsInTBody = tBotyTr.first().locator('td');
        console.log('Columns in tbody:' + await colsInTBody.count());
        const firstRowInTBodyData = tBotyTr.first().locator('td');
        console.log('First row in tbody data:');    
        for (let i = 0; i < await firstRowInTBodyData.count(); i++) {
            console.log(await firstRowInTBodyData.nth(i).textContent());
        }          
    });    
});
