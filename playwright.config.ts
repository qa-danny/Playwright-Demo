import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '.env'),
  quiet: true
});

const desktopViewport = { width: 1350, height: 800 };
const mobileViewport = { width: 430, height: 845 };

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.test.ts', '**/*.setup.ts'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['list', { printSteps: true }], ['junit', { outputFile: 'test-results/junit/results.xml' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Can use CLI Override options if provided. */
    baseURL: 'https://the-internet.herokuapp.com/',
    
    // Override default `data-testid` when using page.getByTestId():
    // this will now become `page.getByTestId('[data-test="xyz"]');`
    testIdAttribute: 'data-test',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    // This can be configured to run smoke/p0 tests, they're run successfully before the
    // rest of the projects are run with the introduction of the `dependencies` option.
    {
      name: 'setup', // if for smoke tests, rename to 'smoke'
      testMatch: /.*\.setup\.ts/ // if p0 tests want to be renamed, change name to `test.smoke.ts` and they will be picked up.
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--disable-features=AutofillServerCommunication',
            '--disable-autofill',
            '--disable-save-password-bubble',
            '--disable-extensions'
          ]
        },
        permissions: ['clipboard-read'],
        viewport: desktopViewport,
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'firefox-mobile',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          firefoxUserPrefs: {
            "extensions.formautofill.addresses.capture.enabled": false,
            "browser.formautofill.addresses.enabled": false,
            "browser.formautofill.creditCards.enabled": false
          },
        },
        hasTouch: true,
        // screen: mobileViewport,
        deviceScaleFactor: 2,
        viewport: mobileViewport
      }
    }
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 14 Pro Max'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
