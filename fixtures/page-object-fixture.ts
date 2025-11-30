import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ArticlePage } from '../pages/articlePage';
import { MockApiPage } from '../pages/mockApiPage';

export type FrameworkFixtures = {
    homePage: HomePage;
    articlePage: ArticlePage;
    mockApiPage: MockApiPage;
};

export const test = base.extend<FrameworkFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },

  mockApiPage: async ({ page }, use) => {
    await use(new MockApiPage(page));
  }
});

export { expect } from '@playwright/test';
