import { test as setup } from '../fixtures/test-options';
import { expect } from '@playwright/test';
import orderData from '../fixtures/order-data.json';

setup.describe('Order Data Sample Tests Demo', () => {
  setup('Mock API Functions', async ({ mockApiPage, page }) => {
    await mockApiPage.navigate();
    // Let's pretend we run an API GET call to retrieve customer data here:
    // For this demo, we'll use the imported JSON data directly
    
    // const apiResponse = await mockApiPage.fetchOrderData();
    const apiResponse = orderData;
    setup.step('1. Get all orders with a total over $200', async () => {
      const ordersOver200 = apiResponse.filter(o => o.orderTotal > 200).map(o => o.orderId);
      console.log('1. Order ID\'s Over $200', ordersOver200);
      expect(ordersOver200.length).toBeGreaterThanOrEqual(3);
    });
    setup.step('2. Get all orders that are still "Processing"', async () => {
      const processingOrders = apiResponse.filter(o => o.orderStatus === 'Processing').map(o => o.orderId);
      console.log('2. Processing Orders: ', processingOrders);
      expect(processingOrders.length).toBeGreaterThanOrEqual(2);
    });
    setup.step('3. Find the most expensive order', async () => {
      // .reduce() = iterate through array, form a single value.
      // if orderTotal has a higher value than the current max, that order becomes the new max.
      // second argument, apiResponse[0], is the initial value for max.
      const mostExpensiveOrder = apiResponse.reduce((max, order) => order.orderTotal > max.orderTotal ? order : max,
        apiResponse[0]);
      console.log('3. Most Expensive Order: ', mostExpensiveOrder);
      expect(mostExpensiveOrder.orderTotal).toBeGreaterThan(330);
    });
    setup.step('4. Calculate the total revenue from all orders', async () => {
      const totalRevenue = apiResponse.reduce((sum, { orderTotal }) => sum + orderTotal, 0);
      console.log('4. Total Revenue: $' + totalRevenue.toFixed(2));
      expect(totalRevenue).toBeGreaterThan(1500);
    });
    setup.step('5. List all unique states from shipping addresses in alphabetical order', async () => {
      // Set's only keep a single unique value -- if NV is added twice, it only keeps one.
      const uniqueStates = Array.from(new Set(apiResponse.map(o => o.shippingAddress.state)));
      console.log('5. Unique States: ', uniqueStates.sort());
      expect(uniqueStates.length).toBeGreaterThan(5);
    });
    setup.step('6. Find the most recent Cancelled Order ID', async () => {
      // This technically can be pushed into one line, but this is more readable.
      // const mostRecentCancelled = apiResponse.filter(o => o.orderStatus === 'Cancelled').reduce((latest, order) => new Date(order.orderDate) > new Date(latest.orderDate) ? order : latest, cancelledOrders[0]);
      const cancelledOrders = apiResponse.filter(o => o.orderStatus === 'Cancelled');
      const mostRecentCancelled = cancelledOrders.reduce((latest, order) => new Date(order.orderDate) > new Date(latest.orderDate) ? order : latest,
        cancelledOrders[0]);
      console.log('6. Most Recent Cancelled Order: ', mostRecentCancelled.orderId);
      expect(mostRecentCancelled.orderId).toEqual('ORD-1004');
    });
  });
});
