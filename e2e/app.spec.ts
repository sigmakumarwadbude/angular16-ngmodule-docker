import { test, expect } from '@playwright/test';

test.describe('Product Management App', () => {
  test('should load welcome page and navigate to product list', async ({ page }) => {
    // Navigate to the base URL
    await page.goto('/');

    // Check navbar header title
    await expect(page.locator('nav')).toContainText('Product Management');

    // Check Welcome card title
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(page.locator('p')).toContainText('Hello Angular 16!');

    // Click "Products" nav link
    await page.click('text=Products');

    // Verify routing and that product list table displays
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator('h2')).toContainText('Product List');
    await expect(page.locator('table')).toBeVisible();

    // Check table headers
    await expect(page.locator('table th').first()).toContainText('Name');

    // Check for some products
    await expect(page.locator('table tbody tr')).toHaveCount(5);
    await expect(page.locator('table tbody tr').first()).toContainText('Leaf Rake');
  });
});
