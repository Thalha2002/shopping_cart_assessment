const axios = require("axios");  // Import axios for mocking
const ShoppingCart = require("./ShoppingCart");  // Import the ShoppingCart class

// Mock axios GET request
jest.mock("axios");

axios.get.mockImplementation((url) => {
  if (url.includes("cornflakes")) {
    return Promise.resolve({ data: { price: 2.52 } });  // Mock response for cornflakes
  }
  if (url.includes("weetabix")) {
    return Promise.resolve({ data: { price: 9.98 } });  // Mock response for weetabix
  }
  return Promise.reject(new Error("Product not found"));
});

test("Adding products to the cart", async () => {
  const cart = new ShoppingCart();  // Correct way to create a new instance

  // Add products to the cart
  await cart.addProduct("cornflakes", 1);  // Price: 2.52
  await cart.addProduct("cornflakes", 1);  // Price: 2.52
  await cart.addProduct("weetabix", 1);   // Price: 9.98
  
  // Get the cart summary
  const summary = cart.getCartSummary();

  // Check the expected values (adjusted based on mock values)
  expect(summary.subtotal).toBe(15.02);  // Corrected expected subtotal
  expect(summary.tax).toBe(1.88);        // Corrected tax value (15.02 * 0.125)
  expect(summary.total).toBe(16.90);     // Corrected total value (15.02 + 1.88)
});
