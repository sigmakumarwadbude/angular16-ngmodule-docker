# Milestone 03: Modern Testing Setup (Vitest + Playwright)

## Overview

In Milestone 2, the product service was introduced and dependency injection was established. Product data flows from a mock data source through a service into the component.

This milestone establishes a modern, comprehensive testing foundation by replacing the legacy Karma/Jasmine runner with **Vitest** for unit and component testing, and introducing **Playwright** for end-to-end and visual snapshot testing.

The goal is a fast, CI-ready test suite with full coverage reporting and visual regression protection for every page.

---

## Objectives

* Replace Karma/Jasmine with Vitest
* Integrate Angular TestBed with Vitest via `@analogjs/vitest-angular`
* Configure V8 code coverage reporting
* Set up Playwright for cross-browser E2E testing
* Add visual snapshot tests for Home and Product List pages
* Add CI-ready npm test scripts
* Fix and improve all existing unit tests

---

## Git Information

### Branch

```bash
feature/testing-setup
```

### Tag

```bash
v0.3-testing-setup
```

---

## Project Structure

```text
src/
├── app/
│   ├── features/
│   │   ├── home/
│   │   │   ├── welcome.component.ts
│   │   │   └── welcome.component.spec.ts
│   │   └── products/
│   │       ├── product-list/
│   │       │   ├── product-list.component.ts
│   │       │   ├── product-list.component.html
│   │       │   └── product-list.component.spec.ts
│   │       ├── services/
│   │       │   ├── product.service.ts
│   │       │   └── product.service.spec.ts
│   │       ├── models/
│   │       │   └── product.ts
│   │       └── data/
│   │           └── products.ts
│   ├── app.component.ts
│   └── app.component.spec.ts
│
├── test-setup.ts              ← NEW: Angular TestBed init for Vitest
│
e2e/
├── app.spec.ts                ← NEW: Playwright E2E + snapshot tests
└── app.spec.ts-snapshots/
    ├── home-page-chromium-win32.png
    └── product-list-page-chromium-win32.png

vitest.config.mts              ← NEW: Vitest configuration (ESM)
playwright.config.ts           ← NEW: Playwright configuration
tsconfig.spec.json             ← MODIFIED: types updated to vitest/globals
package.json                   ← MODIFIED: new test scripts
```

---

## Step 1: Remove Legacy Karma/Jasmine Dependencies

```bash
npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
```

---

## Step 2: Install Modern Testing Dependencies

```bash
npm install -D vitest@^2.0.0 jsdom @analogjs/vitest-angular@1.9.0 @analogjs/vite-plugin-angular@1.9.0 @vitest/coverage-v8@^2.0.0 @playwright/test --legacy-peer-deps
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Step 3: Configure Vitest

### vitest.config.mts

> [!NOTE]
> The `.mts` extension is required because `@analogjs/vite-plugin-angular` is ESM-only and cannot be loaded by a CommonJS `.ts` config file.

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(({ mode }) => ({
  plugins: [angular()],
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode === 'test',
  },
}));
```

### src/test-setup.ts

Initializes the Angular testing environment with zone.js patching so that Angular's TestBed works correctly inside Vitest's Node/jsdom environment.

```typescript
import '@analogjs/vitest-angular/setup-zone';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
```

### tsconfig.spec.json

Updated `types` from `jasmine` to `vitest/globals`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["vitest/globals"]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts",
    "src/test-setup.ts",
    "vitest.config.mts"
  ]
}
```

---

## Step 4: Configure Playwright

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
    timeout: 120 * 1000,
  },
});
```

---

## Step 5: Update CI-Ready Scripts

### package.json scripts

```json
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
}
```

---

## Step 6: E2E Tests with Visual Snapshots

### e2e/app.spec.ts

Three test groups covering content validation, visual snapshots, and navigation:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display correct content', async ({ page }) => { ... });
  test('should match visual snapshot', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-page.png', { fullPage: true });
  });
});

test.describe('Product List Page', () => {
  test('should display product table with 5 rows', async ({ page }) => { ... });
  test('should match visual snapshot', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('product-list-page.png', { fullPage: true });
  });
});

test.describe('Navigation', () => {
  test('should navigate from Home to Products and back', async ({ page }) => { ... });
});
```

Generate or update baseline snapshots:

```bash
npx playwright test --update-snapshots --project=chromium
```

---

## Angular Concepts Covered

### TestBed Integration with Vitest

Angular's `TestBed` requires a DOM environment and zone.js initialization. The `@analogjs/vitest-angular` package bridges this gap, allowing Angular component tests to run natively inside Vitest.

### OnPush Change Detection in Tests

Components using `ChangeDetectionStrategy.OnPush` require manual `fixture.detectChanges()` calls in tests to trigger view updates.

### Visual Regression Testing

Playwright's `toHaveScreenshot()` captures a full-page PNG on first run (baseline) and compares subsequent runs pixel-by-pixel. A configurable `maxDiffPixelRatio` threshold tolerates minor rendering differences across environments.

---

## Validation Checklist

* [x] Karma and Jasmine dependencies removed
* [x] Vitest installed and configured with Angular plugin
* [x] All 4 spec files pass with Vitest (`6 tests`)
* [x] V8 coverage report generated (85%+ coverage)
* [x] Playwright installed with Chromium, Firefox, WebKit browsers
* [x] All 15 E2E tests pass (5 tests × 3 browsers)
* [x] Baseline visual snapshots generated for Home and Product List
* [x] CI-ready npm test scripts configured

---

## Test Results Summary

### Unit Tests

```text
✓ src/app/features/home/welcome.component.spec.ts        (1 test)
✓ src/app/app.component.spec.ts                          (3 tests)
✓ src/app/features/products/services/product.service.spec.ts (1 test)
✓ src/app/features/products/product-list/product-list.component.spec.ts (1 test)

Test Files  4 passed (4)
     Tests  6 passed (6)
```

### Coverage Report

```text
File                  | % Stmts | % Branch | % Funcs | % Lines
----------------------|---------|----------|---------|--------
app.component.ts      |     100 |      100 |     100 |     100
welcome.component.ts  |     100 |      100 |     100 |     100
product-list...ts     |     100 |      100 |     100 |     100
product.service.ts    |     100 |      100 |     100 |     100
```

### E2E Tests

```text
✓ Home Page › should display correct content
✓ Home Page › should match visual snapshot
✓ Product List Page › should display product table with 5 rows
✓ Product List Page › should match visual snapshot
✓ Navigation › should navigate from Home to Products and back

15 passed (chromium + firefox + webkit)
```

---

## Milestone Progress

```text
✅ Milestone 0 - Angular 16 + Docker + Tailwind Setup
✅ Milestone 1 - Product List
✅ Milestone 2 - Product Service
✅ Milestone 3 - Setup Unit and E2E Tests using Vite and Playwright
⬜ Milestone 4 - Product Detail Component (Routing & Parameters)
⬜ Milestone 5 - Product Filter & Search (Reactive search filter logic)
⬜ Milestone 6 - Star Rating UI Component (Nested component communication)
⬜ Milestone 7 - HTTP Client Integration (Connecting to real REST endpoints)
⬜ Milestone 8 - Lazy Loaded Product Module (Routing architecture optimization)
```

---

## Next Milestone

### Milestone 4: Product Detail Component

Upcoming topics:

* Product Detail Component
* Route Parameters (`/products/:id`)
* Router Navigation
* Product Lookup by Id from ProductService
* Master-Detail Pattern
