import { Page, Locator, expect } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly content: Locator;
  readonly checkbox: Locator;
  readonly addElemButton: Locator;
  readonly deleteElemButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { level: 3 });
    this.content = page.locator('div.article-content');
    this.checkbox = page.getByRole('checkbox');
    this.addElemButton = page.getByRole('button', { name: 'Add Element' });
    this.deleteElemButton = page.getByRole('button', { name: 'Delete' });
  }

  async navigateToArticle(articleId: string): Promise<void> {
    await this.page.goto(`/${articleId}`);
  }

  async getArticleTitle(): Promise<string | null> {
    return this.heading.textContent();
  }
  /**
   * Get the text of the entire page.
   * @returns 
   */
  async getArticleContent(): Promise<string | null> {
    return this.content.textContent();
  }

  async clickAddElementButton(): Promise<void> {
    await this.addElemButton.click();
  }

  /**
   * 
   * @param {Number} [index=0] - Which Delete Button to click to remove the element from the DOM. Defaults to 0.
   */
  async clickDeleteButton(index: number = 0): Promise<void> {
    if (index === 0) {
      await this.deleteElemButton.first().click();
    } else {
      await this.deleteElemButton.nth(index).click();
    }
  }

  /**
   * Assertion for the expected number of delete buttons.
   * 
   * @param {number} [num=0] - Number of expected Delete Buttons Present.  Defaults to 0.
   */
  async expectNumDeleteButtonsPresent(num: number = 0): Promise<void> {
    await expect(this.deleteElemButton).toHaveCount(num);
  }

  /**
   * Check if a checkbox is checked.
   * @param [index=0]
   */
  async isCheckboxChecked(index: number = 0): Promise<boolean> {
    return this.checkbox.nth(index).isChecked();
  }

  /**
   * Toggle the checkbox at provided index if it is not checked.
   * (only clicks if unchecked)
   * @param [index=0]
   */
  async toggleCheckbox(index: number = 0): Promise<void> {
    const cb = this.checkbox.nth(index);
    if (!await cb.isChecked())
      await cb.click();
  }

  /**
   * Ensure the checkbox at the given index has the requested state.
   * @param index
   * @param checked
   */
  async setCheckboxState(index: number, checked: boolean): Promise<void> {
    const cb = this.checkbox.nth(index);
    const current = await cb.isChecked();
    if (current !== checked) await cb.click();
  }
};
