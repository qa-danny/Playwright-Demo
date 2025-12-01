import { Page, Locator } from '@playwright/test';

export class MockApiPage {
  readonly page: Page;
  readonly listItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.listItem = page.locator('li');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/api-mocking/');
  }

  async getAllListItems(): Promise<string[]> {
    const items = await this.listItem.allTextContents();
    // Trim whitespace and filter out empty items
    return items.map(t => t?.trim() ?? '').filter(Boolean);
  }
}
