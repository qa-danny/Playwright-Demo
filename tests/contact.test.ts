import { test as setup } from '../fixtures/test-options';

setup.describe('Contact Us Page Tests', () => {
  setup.beforeEach(async ({ contactUsPage }) => {
    await contactUsPage.navigate();
  });
  setup('Submit Empty Contact Us Page, Verify Errors', async ({ contactUsPage }) => {
    await contactUsPage.clickSubmitButton();
    await contactUsPage.expectAllErrors();
  });
  setup('Fill Out Contact Us Form', async ({ contactUsPage }) => {
    const subjectArray = ['Customer service', 'Webmaster', 'Return', 'Return', 'Payments', 'Warranty', 'Status of my order'];
    const subject = Math.floor(Math.random() * subjectArray.length);
    await contactUsPage.navigate();
    await contactUsPage.fillContactForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      subject: subjectArray[subject],
      msg: 'Hello! I am using this to learn Playwright commands.  My order number was 123-456-7890',
      // attachment: false
    });
    await contactUsPage.expectSuccessSubmit();
  });
});
