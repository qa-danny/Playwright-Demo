import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly subheading: Locator;
  readonly links: Locator;
  readonly groupLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.subheading = page.locator('h2');
    this.links = page.locator('a');
    this.groupLinks = page.locator('ul')
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async getHeadingText(): Promise<string | null> {
    return this.heading.textContent();
  }

  async getSubheadingText(): Promise<string | null> {
    return this.subheading.textContent();
  }

  async countLinks(): Promise<number> {
    return this.links.count();
  }

  async getAllLinkTexts(): Promise<string[]> {
    const texts = await this.links.allTextContents();
    // Trim whitespace and filter out empty items
    return texts.map(t => t?.trim() ?? '').filter(Boolean);
  }

  async getAllLinks(): Promise<string[]> {
    const linksOnWebPage = this.groupLinks.locator('a');
    return linksOnWebPage.evaluateAll((link: HTMLAnchorElement[]) => link.map(element => element.href));
  }
}
