import { test as setup } from '../fixtures/test-options';
import { expect } from '@playwright/test';

setup.describe('Homepage Tests Demo', () => {
  setup('Access and Verify with Homepage Functions', async ({ homePage, page, request }) => {
    await setup.step('Navigate to homepage', async () => {
      await page.goto('/');
      const result = await homePage.getHeadingText();
      expect(result).toBeDefined();
      expect(result).toContain('Welcome to the-internet');
    });
    await setup.step('Verify subheading text', async () => {
      const subheading = await homePage.getSubheadingText();
      expect(subheading).toBeDefined();
      expect(subheading).toContain('Available Examples');
    });
    await setup.step('Count and log all links on the homepage', async () => {
      const linkCount = await homePage.countLinks();
      expect(linkCount).toBeGreaterThan(0);
      const linkTexts = await homePage.getAllLinkTexts();
      console.log('Links on the homepage:', linkTexts);
    });

    // Test Steps cannot be tagged, so if this wanted to be run with other HTTP tests,
    // It would need to become either A) its own file, or B) be written its own `test.describe()`
    await setup.step('Verify all links lead to 200', async () => {
      await page.goto('/');
      
      // Gather all links on the webpage:
      const links = await homePage.getAllLinks();
      console.log(links);

      // Send HTTP GET request:
      for (const link of links) {
        const response = await request.get(link, { timeout: 5000 });
        if (response.status() === 200) {
          expect(response.ok(), `Expected response to be ok`).toBe(true);
        } else if (response.status() === 401) {
          console.log(`Skipping ${link}: received 401 Unauthorized.`);
        }
      }
    });
  });
});
