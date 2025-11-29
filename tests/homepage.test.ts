import { test as setup } from '../fixtures/test-options';
import { expect } from '@playwright/test';

setup.describe('Homepage Tests Demo', () => {
  setup('Access and Verify with Homepage Functions', async ({ homePage, page }) => {
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
  });
});
