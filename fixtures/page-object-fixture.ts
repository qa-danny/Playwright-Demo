import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ArticlePage } from '../pages/articlePage';

export type FrameworkFixtures = {
    homePage: HomePage;
    articlePage: ArticlePage;
};

export const test = base.extend<FrameworkFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
});

export { expect } from '@playwright/test';
