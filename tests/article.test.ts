import { test as setup, tags } from '../fixtures/test-options';
import { expect } from '@playwright/test';

setup.describe('Article Tests Demo', { tag: tags.SMOKE }, () => {
  setup('should access Checkbox page function', async ({ articlePage }) => {
    await setup.step('Navigate to article page', async () => {
      await articlePage.navigateToArticle('checkboxes');
      const title = await articlePage.getArticleTitle();
      expect(title).toBeDefined();
      expect(title).toContain('Checkboxes');
    });
    await setup.step('Check initial checkbox states and toggle if necessary', async () => {
      const isFirstChecked = await articlePage.isCheckboxChecked(0);
      const isSecondChecked = await articlePage.isCheckboxChecked(1);
      expect(isFirstChecked).toBeFalsy();
      expect(isSecondChecked).toBeTruthy();

      // Toggle the first checkbox if not checked
      await articlePage.toggleCheckbox(0);
      const isFirstCheckedAfterToggle = await articlePage.isCheckboxChecked(0);
      expect(isFirstCheckedAfterToggle).toBeTruthy();
    });
  });
});
