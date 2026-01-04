import { test as base, Page } from '@playwright/test';

import { ArticlePage } from '../pages/articlePage';
import { ContactUsPage } from '../pages/contactUsPage';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { MockApiPage } from '../pages/mockApiPage';

export type FrameworkFixtures = {
  articlePage: ArticlePage;
  contactUsPage: ContactUsPage;
  homePage: HomePage;
  loginCustomerWorkflow: LoginPage;
  mockApiPage: MockApiPage;
};

export type MyOptions = {
  email: string;
  password: string;
}

export const test = base.extend<FrameworkFixtures, MyOptions>({
  // Default values for Fixtures:
  email: ['customer@practicesoftwaretesting.com', { scope: 'worker', option: true }],
  password: ['welcome01', { scope: 'worker', option: true }],

  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },

  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },

  homePage: async ({ page }, use) => {
    // In this type of fixture, anything done above the `await use()` will be done first, like a `beforeEach()`.
    // In similar fashion, anything after the `await use()` will be done after the test.
    await use(new HomePage(page));
  },

  // Re-usable Workflow to sign customer in to account. See `auth.test.ts`
  loginCustomerWorkflow: async ({ page, email, password }: { page: Page, email: string, password: string }, use): Promise<void> => {
    const loginPage = new LoginPage(page);
    
    // Setup: navigate and log in before the test runs
    await loginPage.navigate();
    await loginPage.fillOutLoginPage(email, password);
    
    // Provide the LoginPage instance to the test
    await use(loginPage);
  },

  mockApiPage: async ({ page }, use) => {
    await use(new MockApiPage(page));
  }
});

export { expect } from '@playwright/test';
