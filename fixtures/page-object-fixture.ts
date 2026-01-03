import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ArticlePage } from '../pages/articlePage';
import { MockApiPage } from '../pages/mockApiPage';
import { LoginPage } from '../pages/loginPage';

export type FrameworkFixtures = {
    homePage: HomePage;
    articlePage: ArticlePage;
    mockApiPage: MockApiPage;
    loginCustomerWorkflow: LoginPage;
};

export type MyOptions = {
  email: string;
  password: string;
}

export const test = base.extend<FrameworkFixtures, MyOptions>({
  homePage: async ({ page }, use) => {
    // In this type of fixture, anything done above the `await use()` will be done first, like a `beforeEach()`.
    // In similar fashion, anything after the `await use()` will be done after the test.
    await use(new HomePage(page));
  },

  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },

  mockApiPage: async ({ page }, use) => {
    await use(new MockApiPage(page));
  },

  // Default values for Fixtures:
  email: ['customer@practicesoftwaretesting.com', { scope: 'worker', option: true }],
  password: ['welcome01', { scope: 'worker', option: true }],

  // Re-usable Workflow to sign customer in to account. See `auth.test.ts`
  loginCustomerWorkflow: async ({ page, email, password }: { page: Page, email: string, password: string }, use): Promise<void> => {
    const loginPage = new LoginPage(page);
    
    // Setup: navigate and log in before the test runs
    await loginPage.navigate();
    await loginPage.fillOutLoginPage(email, password);
    
    // Provide the LoginPage instance to the test
    await use(loginPage);
  }
});

export { expect } from '@playwright/test';
