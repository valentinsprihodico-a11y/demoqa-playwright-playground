import { test } from '@playwright/test';            
import { TextBoxPage } from '../../demoqa/pages/TextBoxPage';
import { Sidebar } from '../../demoqa/components/Sidebar';

 test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/text-box', {
            waitUntil: 'domcontentloaded',
            //waitUntil: 'commit',
        });
 });

test.describe('Text Box - POM + components style', () => {
    test('Text Box - valid submit', async ({ page }) => {
        const textBox = new TextBoxPage(page);
        const sidebar = new Sidebar(page); 

        await sidebar.openTextBox();
        await test.step('Fill text box form', async () => {
            await textBox.fillForm({
                name: 'John Doe',
                email: 'john@example.com',
                currentAddress: 'Current',
                permanentAddress: 'Permanent',
            });
        });

        await test.step('Submit form', async () => {
            await textBox.submit();
        });

        await test.step('Verify success message', async () => {
            await textBox.expectSuccess({
                name: 'John Doe',
                email: 'john@example.com',
            });
        });
    });
}); 