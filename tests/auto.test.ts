import { Page, expect, test } from "@playwright/test";

test.describe("Automation UI Tests", () => {
  test('Homepage Search', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="search-query"]').fill('Hammer');
    await page.locator('[data-test="search-submit"]').click();
    const caption = page.locator('[data-test="search-caption"]');
    await expect(caption).toContainText('Searched for: Hammer');
  });
  test('Navigate To Product Page', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="product-01K8MK0AC4H6JWR6P6GPQD2YVM"]').click();
    const productName = page.locator('[data-test="product-name"]');
    await expect(productName).toBeAttached();
    await expect(productName).toContainText('Combination Pliers');
  });
});
