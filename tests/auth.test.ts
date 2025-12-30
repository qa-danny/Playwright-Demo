import { test as setup, tags } from '../fixtures/test-options';
import { expect } from '@playwright/test';

setup.describe('Create Customer 01 Auth', () => {
  setup('Create Customer Authentication', async ({ page, context }) => {
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    const customer01AuthFile = ".auth/customer01.json";

    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.getByTestId('email').fill(email);
    await page.getByTestId('password').fill(password);
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');

    // creates folder + file with Cookie Info browser session has:
    await context.storageState({ path: customer01AuthFile });
  })
});

setup.describe('Homepage Customer 01 Authenticated', () => {
  setup.use({ storageState: ".auth/customer01.json" });
  setup.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });
  setup('check to verify customer is authenticated', async ({ page }) => {
    await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
  })
})
