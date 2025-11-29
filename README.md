# Playwright-Demo

This is a small Playwright Test project (TypeScript) with a few example tests and page object models.

## Quick overview
- Playwright + @playwright/test v1.56.x
- Tests live in `tests/`
- Page object models in `pages/`
- Fixtures in `fixtures/` configure `homePage` and `articlePage`

---

## Prerequisites
- Node.js
- npm

macOS quick install (Homebrew):

```bash
brew install node
```

---

## Getting started (from a fresh clone)

1. Clone the repository:

```bash
git clone https://github.com/qa-danny/Playwright-Demo.git
cd Playwright-Demo
```

2. Install node dependencies:

```bash
npm install
```
- or -
```bash
npm ci
```

3. Install Playwright:

```bash
npx playwright install
```

---

## Running tests
Run all tests:

```bash
npx playwright test
```

Run a single file:

```bash
npx playwright test tests/example.test.ts
```

Run tests headed (view in browser):

```bash
npx playwright test --headed
```

Run a single test by name (grep):

```bash
npx playwright test -g "has title"
```

---
