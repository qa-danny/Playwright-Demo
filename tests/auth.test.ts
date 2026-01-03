import { test as setup } from '../fixtures/test-options';
import { expect } from '@playwright/test';

// Uncoment to use overridden email and password:
// setup.use({ email: 'customer2@practicesoftwaretesting.com', password: 'welcome02' });

setup.describe('Create Customer 01 Auth', () => {
  setup('Create Customer Authentication', async ({ loginCustomerWorkflow, page, context }) => {
    loginCustomerWorkflow;
    // Could move this into a "header" page object, but for simplicity's sake, this is fine:
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');

    // creates folder + file with Cookie Info browser session has:
    await context.storageState({ path: '.auth/customer01.json' });
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
  });
});
