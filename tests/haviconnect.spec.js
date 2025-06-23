import { test, expect } from '@playwright/test';

test('havi test', async ({ page }) => {
    test.setTimeout(120000);
  await page.goto('https://www.haviconnect.com');
  await page.getByRole('textbox', { name: 'Please enter connect user id' }).fill('xxxxxxxxx');
  await page.getByRole('button', { name: 'Continue with Connect Account' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for ahi.de' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for ahi.de' }).fill('xxxxxxxxx');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('100');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  //await page.goto('https://www.haviconnect.com/login');
});
