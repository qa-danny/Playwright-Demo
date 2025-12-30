import { test as setup, tags } from '../fixtures/test-options';
import { expect } from '@playwright/test';

setup.describe('Article Tests Demo', { tag: tags.SMOKE }, () => {
  setup('Should access Checkbox page', async ({ articlePage }) => {
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
  setup('Should access Add/Remove Elements page', async ({ articlePage }) => {
    await setup.step('Navigate to Add/Remove Elements Page', async () => {
      await articlePage.navigateToArticle('add_remove_elements/');
      expect(await articlePage.getArticleTitle()).toBeDefined();
      expect(await articlePage.getArticleTitle()).toContain('Add/Remove Elements');
    });
    await setup.step('Click Add Element Button Three Times', async () => {
      await articlePage.expectNumDeleteButtonsPresent(0);
      await articlePage.clickAddElementButton();
      await articlePage.expectNumDeleteButtonsPresent(1);
      await articlePage.clickAddElementButton();
      await articlePage.expectNumDeleteButtonsPresent(2);
      await articlePage.clickAddElementButton();
      // Forcing the test to fail here in "PR Builder" Test:
      await articlePage.expectNumDeleteButtonsPresent();
    });
    await setup.step('Click Delete buttons', async () => {
      /*
        Because there are multiple Delete Buttons added with the same locator,
        We will have to either A) call a separate function to say "click first"
        or B) add in a parameter for an index-based locator.

        Let's add in a parameter for index based, and then in the function do some magic
      */
      await articlePage.clickDeleteButton(2);
      await articlePage.expectNumDeleteButtonsPresent(2);
      await articlePage.clickDeleteButton(1);
      await articlePage.expectNumDeleteButtonsPresent(1);
      await articlePage.clickDeleteButton();
      await articlePage.expectNumDeleteButtonsPresent(0);
    })
  });
});
