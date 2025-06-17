import {test, expect} from '@playwright/test';

test ('my havi test', async ({page}) => {
    test.setTimeout(60000); 
    await page.goto('https://www.haviconnect.com');
    
    await expect(page).toHaveTitle('HAVI Connect');

});