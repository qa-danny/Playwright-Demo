import { test as base, mergeTests } from '@playwright/test';
import { test as pageObjectFixture } from './page-object-fixture';

const test = mergeTests(pageObjectFixture);

const expect = base.expect;

const tags = {
  SMOKE: '@smoke',
  INTEG: '@integ',
  E2E: '@e2e',
};

export { expect, tags, test };
