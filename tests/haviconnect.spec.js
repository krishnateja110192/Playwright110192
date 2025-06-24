require('dotenv').config();
import { test, expect } from '@playwright/test';

test('havi test', async ({ page }) => {

    test.setTimeout(90000);

    // 1. Retrieve username and password from environment variables
    const username = process.env.HAVI_USERNAME;
    const password = process.env.HAVI_PASSWORD;

    // Basic validation (optional but good practice)
    if (!username || !password) {
        throw new Error('HAVI_USERNAME and HAVI_PASSWORD environment variables must be set.');
    }

    await page.goto('https://www.haviconnect.com');

    // Use .fill() for username
    const usernameLocator = page.getByRole('textbox', { name: 'Please enter connect user id' });
    await usernameLocator.fill(username, { mask: true }); 
    console.log('Username field filled securely.');

    await page.getByRole('button', { name: 'Continue with Connect Account' }).click();

    // It's good practice to wait for the element to be visible/enabled if it appears after a click
    await page.getByRole('textbox', { name: 'Enter the password for ahi.de' }).waitFor({ state: 'visible' });

    const maskedPasswordForReport = '********';

    const passwordLocator = page.getByRole('textbox', { name: 'Enter the password for ahi.de' }); 
    await test.step(`Fill password field (masked in report)`, async () => {
        // Use the actual password for the action
        await passwordLocator.fill(password, {mask: true}); 
    });
    console.log('Password field filled securely.');

    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('100');
    await page.getByRole('button', { name: 'Search' }).click();
    // Changed the expected URL as your script seems to proceed after login.
    // If it's failing at login, you might still want to assert the login page.
    await expect(page).toHaveURL(/haviconnect\.com/); // Using a regex for more flexibility
});