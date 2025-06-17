import {test, expect} from '@playwright/test';
const { chromium } = require('playwright');

test ('sauce test 2', async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="primary-header"] div').filter({ hasText: 'Swag Labs' }).first().click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
});