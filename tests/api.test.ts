import { test as setup, tags } from '../fixtures/test-options';
import { expect } from '@playwright/test';

setup.describe('API tests', { tag: tags.SMOKE }, () => {
  setup('GET /products', async ({ request }) => {
    // /products?page=1&between=price,1,100&is_rental=false
    const apiUrl = 'https://api.practicesoftwaretesting.com';
    const response = await request.get(apiUrl + '/products')

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);
  });

  setup('POST /users/login', async ({ request }) => {
    const apiUrl = 'https://api.practicesoftwaretesting.com';
    const response = await request.post(apiUrl + '/users/login', {
      data: {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01"
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.access_token).toBeTruthy();
  });
})
