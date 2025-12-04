import { test as setup } from '../fixtures/test-options';
import { expect } from '@playwright/test';
import orderData from '../fixtures/order-data.json';

setup.describe('Order Data Sample Tests Demo', () => {
  setup('1. Get all orders with a total over $200', async ({}) => {
    // Let's pretend we run an API GET call to retrieve customer data here:
    // For this demo, we'll use the imported JSON data directly
    
    // const apiResponse = await mockApiPage.fetchOrderData();
    const apiResponse = orderData;
    const ordersOver200 = apiResponse.filter(o => o.orderTotal > 200).map(o => o.orderId);
    console.log('1. Order ID\'s Over $200', ordersOver200);
    expect(ordersOver200.length).toBeGreaterThanOrEqual(3);
  });

  setup('2. Get all orders that are still "Processing"', async ({}) => {
    const apiResponse = orderData;
    const processingOrders = apiResponse.filter(o => o.orderStatus === 'Processing').map(o => o.orderId);
    console.log('2. Processing Orders: ', processingOrders);
    expect(processingOrders.length).toBeGreaterThanOrEqual(2);
  });

  setup('3. Find the most expensive order', async ({}) => {
    const apiResponse = orderData;
    const mostExpensiveOrder = apiResponse.reduce((max, order) => order.orderTotal > max.orderTotal ? order : max,
      apiResponse[0]);
    console.log('3. Most Expensive Order: ', mostExpensiveOrder);
    expect(mostExpensiveOrder.orderTotal).toBeGreaterThan(330);
  });

  setup('4. Calculate the total revenue from all orders', async ({}) => {
    const apiResponse = orderData;
    const totalRevenue = apiResponse.reduce((sum, { orderTotal }) => sum + orderTotal, 0);
    console.log('4. Total Revenue: $' + totalRevenue.toFixed(2));
    expect(totalRevenue).toBeGreaterThan(1500);
  });

  setup('5. List all unique states from shipping addresses in alphabetical order', async ({}) => {
    const apiResponse = orderData;
    const uniqueStates = Array.from(new Set(apiResponse.map(o => o.shippingAddress.state)));
    console.log('5. Unique States: ', uniqueStates.sort());
    expect(uniqueStates.length).toBeGreaterThan(5);
  });

  setup('6. Find the most recent Cancelled Order ID', async ({}) => {
    const apiResponse = orderData;
    const cancelledOrders = apiResponse.filter(o => o.orderStatus === 'Cancelled');
    const mostRecentCancelled = cancelledOrders.reduce((latest, order) => new Date(order.orderDate) > new Date(latest.orderDate) ? order : latest,
      cancelledOrders[0]);
    console.log('6. Most Recent Cancelled Order: ', mostRecentCancelled.orderId);
    expect(mostRecentCancelled.orderId).toEqual('ORD-1004');
  });

});
