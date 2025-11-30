import { Page, Locator } from '@playwright/test';

export class MockApiPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/api-mocking/');
  }
}
