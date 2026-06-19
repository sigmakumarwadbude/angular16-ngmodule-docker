import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display correct content', async ({ page }) => {
    await expect(page.locator('nav')).toContainText('Product Management');
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(page.locator('p')).toContainText('Hello Angular 16!');
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait for the page to fully stabilize
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-page.png', { fullPage: true });
  });
});

test.describe('Product List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('should display product table with 5 rows', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Product List');
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('table th').first()).toContainText('Image');
    await expect(page.locator('table tbody tr')).toHaveCount(5);
    await expect(page.locator('table tbody tr').first()).toContainText(
      'Leaf Rake',
    );
  });

  test('should match visual snapshot', async ({ page }) => {
    await page.setViewportSize({
      width: 1280,
      height: 720,
    });

    await page.waitForLoadState('networkidle');

    await expect(page.locator('table')).toHaveScreenshot(
      'product-list-table.png',
    );
  });
});

test.describe('Navigation', () => {
  test('should navigate from Home to Products and back', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Welcome');

    // Navigate to products
    await page.click('text=Products');
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator('h2')).toContainText('Product List');

    // Navigate back home
    await page.click('text=Home');
    await expect(page).toHaveURL(/^http:\/\/localhost:4200\//);
    await expect(page.locator('h1')).toContainText('Welcome');
  });
});
