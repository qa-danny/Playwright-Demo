import { test as setup } from '../fixtures/test-options';
import { expect } from '@playwright/test';
import fruitData from '../fixtures/fruits-id.json';

setup.describe('Mock API Tests Demo', () => {
  setup('Mock API Functions', async ({ mockApiPage, page }) => {
    await setup.step('Navigate to mock API page', async () => {
      await page.route('**/api/v1/fruits', async (route) => {
        await route.fulfill({ json: fruitData });
      });
      await mockApiPage.navigate();

      // Verify that the first item is 'Banana' matching the mocked data
      const items = await mockApiPage.getAllListItems();
      await expect(items[0]).toBe('Banana');
    });
  });
});
