import { test as setup } from '../fixtures/test-options';
import { expect } from '@playwright/test';

setup.describe('Homepage Customer 01 Authenticated', () => {
  setup.use({ storageState: ".auth/customer01.json" });
  setup.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });
  setup('check to verify customer is authenticated', async ({ page }) => {
    await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
  });
});
