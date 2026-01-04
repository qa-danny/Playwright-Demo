import { Page, Locator, expect } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly firstNameError: Locator;
  readonly lastName: Locator;
  readonly lastNameError: Locator;
  readonly email: Locator;
  readonly emailError: Locator;
  readonly submitButton: Locator;
  readonly subjectDropdown: Locator;
  readonly subjectError: Locator;
  readonly messageBox: Locator;
  readonly messageError: Locator;
  readonly attachmentBox: Locator;
  readonly success: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId('first-name');
    this.firstNameError = page.getByTestId('first-name-error');
    this.lastName = page.getByTestId('last-name');
    this.lastNameError = page.getByTestId('last-name-error');
    this.email = page.getByTestId('email');
    this.emailError = page.getByTestId('email-error')
    this.subjectDropdown = page.getByTestId('subject');
    this.subjectError = page.getByTestId('subject-error');
    this.messageBox = page.getByTestId('message');
    this.messageError = page.getByTestId('message-error');
    this.attachmentBox = page.getByTestId('attachment');
    this.submitButton = page.getByTestId('contact-submit');
    this.success = page.getByRole('alert');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/contact');
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastName.fill(lastName);
  }

  async fillEmail(email: string): Promise<void> {
    await this.email.fill(email);
  }

  async selectSubject(subject: string): Promise<void> {
    await this.subjectDropdown.selectOption({ label: subject });
  }

  async fillMessage(msg: string): Promise<void> {
    await this.messageBox.fill(msg);
  }

  async fillContactForm({
    firstName,
    lastName,
    email,
    subject,
    msg,
    attachment
  }: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    msg: string;
    attachment?: boolean;
  }): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.selectSubject(subject);
    await this.fillMessage(msg);
    if (!!attachment) {
      console.log('Adding Attachment for Later!');
    }
    await this.clickSubmitButton();
  }

  async expectAllErrors(): Promise<void> {
    await expect(this.firstNameError).toBeVisible();
    await expect(this.firstNameError).toHaveText('First name is required');
    await expect(this.lastNameError).toBeVisible();
    await expect(this.lastNameError).toHaveText('Last name is required');
    await expect(this.emailError).toBeVisible();
    await expect(this.emailError).toHaveText('Email is required');
    await expect(this.subjectError).toBeVisible();
    await expect(this.subjectError).toHaveText('Subject is required');
    await expect(this.messageError).toBeVisible();
    await expect(this.messageError).toHaveText('Message is required');
  }

  async expectSuccessSubmit(): Promise<void> {
    await expect(this.success).toBeVisible();
    await expect(this.success).toHaveText('Thanks for your message! We will contact you shortly.');
    await expect(this.success).toHaveCSS('color', 'rgb(10, 54, 34)');
  }
}
