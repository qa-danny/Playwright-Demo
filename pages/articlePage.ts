import { Page, Locator } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly content: Locator;
  readonly checkbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h3');
    this.content = page.locator('div.article-content');
    this.checkbox = page.locator('input[type="checkbox"]');
  }

  async navigateToArticle(articleId: string): Promise<void> {
    await this.page.goto(`/${articleId}`);
  }

  async getArticleTitle(): Promise<string | null> {
    return this.heading.textContent();
  }

  async getArticleContent(): Promise<string | null> {
    return this.content.textContent();
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
