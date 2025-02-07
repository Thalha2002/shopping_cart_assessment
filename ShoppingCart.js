const axios = require("axios");

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  async addProduct(product, quantity) {
    const price = await this.fetchPrice(product);
    if (price === null) {
      console.error(`Price not found for ${product}`);
      return;
    }

    const existingItem = this.items.find(item => item.product === product);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity, price });
    }
  }

  async fetchPrice(product) {
    try {
      const response = await axios.get(`http://localhost:3001/products/${product}`);
      return response.data.price;
    } catch (error) {
      console.error(`Error fetching price for ${product}`);
      return null;
    }
  }

  getCartSummary() {
    const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = parseFloat((subtotal * 0.125).toFixed(2));
    const total = parseFloat((subtotal + tax).toFixed(2));

    return {
      items: this.items.map(item => `${item.quantity} x ${item.product}`),
      subtotal,
      tax,
      total,
    };
  }
}

module.exports = ShoppingCart; // Ensure the class is exported correctly

