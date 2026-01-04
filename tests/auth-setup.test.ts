import { test as setup } from '../fixtures/test-options';
import { expect } from '@playwright/test';

// Uncoment to use overridden email and password:
//setup.use({ email: 'customer2@practicesoftwaretesting.com', password: 'welcome01' });

setup.describe('Create Customer 01 Auth', () => {
  setup('Create Customer Authentication', async ({ loginCustomerWorkflow, page, context }) => {
    loginCustomerWorkflow;
    // Could move this into a "header" page object, but for simplicity's sake, this is fine:
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');

    // creates folder + file with Cookie Info browser session has:
    await context.storageState({ path: '.auth/customer01.json' });
  })
});
