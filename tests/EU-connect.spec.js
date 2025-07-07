require('dotenv').config(); // Load environment variables from .env file
import { test, expect } from '@playwright/test';

test('havi test flow (robust)', async ({ page }) => {

    // Set an increased overall timeout for the entire test
    test.setTimeout(90000); // 90 seconds (1.5 minutes) timeout for the whole test

    const username = process.env.HAVI_USERNAME;
    const password = process.env.HAVI_PASSWORD;

    // Basic validation to ensure environment variables are set
    if (!username || !password) {
        throw new Error('HAVI_USERNAME and HAVI_PASSWORD environment variables must be set.');
    }

    // Navigate to the login page
    await test.step('Navigate to login page', async () => {
        await page.goto('https://www.haviconnect.com'); // Using the URL provided in this script
        console.log('Navigated to HaviConnect login page.');
    });

    // Fill username and continue
    await test.step('Fill username and continue', async () => {
        const usernameLocator = page.getByRole('textbox', { name: 'Please enter connect user id' });
        // Ensure the username field is visible and enabled before interacting
        await usernameLocator.waitFor({ state: 'visible', timeout: 30000 });
        await usernameLocator.click(); // Click to focus the field
        // Fill the username, masking it in reports for security
        await usernameLocator.fill(username, { mask: true });
        console.log('Username field filled securely.');

        await page.getByRole('button', { name: 'Continue with Connect Account' }).click();
        console.log('Clicked "Continue with Connect Account".');
    });

    // Fill password and sign in
    await test.step('Fill password and sign in', async () => {
        // Wait for the password field to become visible
        const passwordLocator = page.getByRole('textbox', { name: 'Enter the password for ahi.de' });
        await passwordLocator.waitFor({ state: 'visible', timeout: 30000 });
        console.log('Password field visible.');

        // Fill the password, masking it in reports for security
        await passwordLocator.fill(password, { mask: true });
        console.log('Password field filled securely.');

        await page.getByRole('button', { name: 'Sign in' }).click();
        console.log('Clicked "Sign in".');
    });

    // Confirm "Yes" for login (if prompted)
    await test.step('Confirm login prompt', async () => {
        const yesButton = page.getByRole('button', { name: 'Yes' });
        // Use a confident wait for the "Yes" button to appear, as it's a critical step after login
        await yesButton.waitFor({ state: 'visible', timeout: 30000 });
        await yesButton.click();
        console.log('Clicked "Yes" on confirmation prompt.');
    });

    // Search for customer 100
    await test.step('Search for customer 100', async () => {
        const searchTextBox = page.getByRole('textbox', { name: 'Search' });
        // Wait for search box to be visible and clickable after successful login
        await searchTextBox.waitFor({ state: 'visible', timeout: 30000 });
        await searchTextBox.click();
        await searchTextBox.fill('100');
        console.log('Filled search box with "100".');

        await page.getByRole('button', { name: 'Search' }).click();
        console.log('Clicked search button.');
        // Consider adding a wait for search results to appear here, e.g., page.getByText('Customer Name').waitFor()
    });

    // Perform Logout
    await test.step('Perform Logout', async () => {
        // IMPORTANT: If 'Log out' is not directly visible and requires opening a menu,
        // you will need additional steps here, similar to the previous script:
        // 1. Click the button/icon that opens the user menu (e.g., page.getByRole('button', { aria-label: 'User profile' }))
        // 2. Then click the 'Log out' button.
        const logoutButton = page.getByRole('button', { name: 'Log out' });
        await logoutButton.waitFor({ state: 'visible', timeout: 20000 });
        await logoutButton.click();
        console.log('Clicked "Log out".');
    });

    // Verify logout
    await test.step('Verify logout', async () => {
        // Expect to be on a URL containing "login" or "haviconnect.com" after logout
        await expect(page).toHaveURL(/login|haviconnect\.com/, { timeout: 30000 });
        console.log('Successfully logged out.');
    });

});
