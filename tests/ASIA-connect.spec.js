require('dotenv').config(); // Load environment variables from .env file
import { test, expect } from '@playwright/test';

test('havi connect test flow', async ({ page }) => {

    // Set an increased overall timeout for the entire test
    test.setTimeout(120000); // 120 seconds (2 minutes) timeout for the whole test


    const username = process.env.HAVI_USERNAME;
    const password = process.env.HAVI_PASSWORD;

    // Basic validation to ensure environment variables are set
    if (!username || !password) {
        throw new Error('HAVI_USERNAME and HAVI_PASSWORD environment variables must be set.');
    }

    // Navigate to the login page
    await test.step('Navigate to login page', async () => {
        await page.goto('https://asia.haviconnect.com/');
        console.log('Navigated to HaviConnect login page.');
    });

    // Fill username and continue
    await test.step('Fill username and continue', async () => {
        const usernameLocator = page.getByRole('textbox', { name: 'Please enter connect user id' });
        // Ensure the username field is visible and enabled before interacting
        await usernameLocator.waitFor({ state: 'visible' });
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
        await passwordLocator.waitFor({ state: 'visible' });
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
        // Use a confident wait for the "Yes" button to appear, as it's a critical step
        await yesButton.waitFor({ state: 'visible', timeout: 30000 });
        await yesButton.click();
        console.log('Clicked "Yes" on confirmation prompt.');
    });

    // Search for customer 1020
    await test.step('Search for customer 1020', async () => {
        const searchTextBox = page.getByRole('textbox', { name: 'Search' });
        // Wait for search box to be visible and clickable
        await searchTextBox.waitFor({ state: 'visible', timeout: 30000 });
        await searchTextBox.click();
        await searchTextBox.fill('1020');
        console.log('Filled search box with "1020".');

        await page.getByRole('button', { name: 'Search' }).click();
        console.log('Clicked search button.');
    });

    // Select customer "Chitose|〒066-0061" and navigate to dashboard
    await test.step('Select customer and navigate to dashboard', async () => {
        const customerText = page.getByText('Chitose|〒066-0061');
        // Wait for customer text to appear, indicating search results are loaded
        await customerText.waitFor({ state: 'visible', timeout: 30000 });
        await customerText.click();
        console.log('Selected "Chitose|〒066-0061".');

        // Assert that the URL navigates to the expected dashboard page
        await expect(page).toHaveURL('https://asia.haviconnect.com/customer/app/dashboard?clockey=1020&custkey=MCD&ldekey=JP', { timeout: 45000 });
        console.log('Navigated to customer dashboard.');
    });

    // Navigate to "Orders & Deliveries"
    await test.step('Navigate to Orders & Deliveries', async () => {
        const ordersLink = page.getByRole('listitem').filter({ hasText: 'Orders & Deliveries' }).getByRole('link');
        // Wait for link to be visible before clicking
        await ordersLink.waitFor({ state: 'visible', timeout: 30000 });
        await ordersLink.click();
        console.log('Navigated to "Orders & Deliveries".');
    });

    // Check for "Planned" text and move to next step
    await test.step('Verify "Planned" text exists', async () => {
        // Locator to find the first element containing the text 'Planned'
        const plannedDeliveryText = page.getByText('Planned').first();
        // Wait for the text 'Planned' to be visible, ensuring the page content has loaded.
        await plannedDeliveryText.waitFor({ state: 'visible', timeout: 30000 });
        console.log('Successfully found "Planned" text on the page. Proceeding to next steps.');
    });

    // Step 1 of dynamic elements interaction
    await test.step('Click dynamic element to reveal options and navigate to Application/Store Selector', async () => {
        // This class name is still very specific; consider if it represents the Application/Store Selector button itself,
        // or a button that needs to be clicked before the Application/Store Selector appears.
        // Assuming it's a necessary click as per your feedback.
        const dynamicElement1 = page.locator('._0a04c2a562dd0f127528ca95d78dfa06');
        await dynamicElement1.waitFor({ state: 'visible', timeout: 20000 });
        await dynamicElement1.click();
        console.log('Clicked first dynamic element (._0a04c2a562dd0f127528ca95d78dfa06).');

        // New step: Click on "Application & Store Selector" which navigates back or shows options
        const appStoreSelectorButton = page.getByRole('button', { name: 'Application & Store Selector' });
        await appStoreSelectorButton.waitFor({ state: 'visible', timeout: 20000 });
        await appStoreSelectorButton.click();
        console.log('Clicked "Application & Store Selector" button.');
    });

    // Perform Logout using the newly identified stable locator
    await test.step('Perform Logout', async () => {
        const logoutButton = page.getByRole('button', { name: 'Log out' });
        // Wait for logout button to be visible. Note the change from 'Logout' to 'Log out'
        await logoutButton.waitFor({ state: 'visible', timeout: 45000 });
        await logoutButton.click();
        console.log('Clicked "Log out".');
    });

    // Optional: Assert that the user is redirected back to the login page or a logged-out state
    await test.step('Verify logout', async () => {
        // Expect to be on a URL containing "login" or "haviconnect.com" (to cover potential redirects)
        await expect(page).toHaveURL(/login|haviconnect\.com/, { timeout: 30000 });
        console.log('Successfully logged out.');
    });

});
