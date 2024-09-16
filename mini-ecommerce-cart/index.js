const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Commands: add, view, discounts, checkout, exit\nEnter a command: '
});

const products = [
  { id: 'P001', name: 'Laptop', price: 1000.00, category: 'Electronics' },
  { id: 'P002', name: 'Phone', price: 500.00, category: 'Electronics' },
  { id: 'P003', name: 'T-Shirt', price: 20.00, category: 'Fashion' }
];

let cart = [];

const addToCart = (productId, quantity) => {
  const product = products.find(p => p.id === productId);
  if (product) {
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    console.log(`${quantity} ${product.name}(s) added to the cart.`);
  } else {
    console.log('Product not found.');
  }
};

const viewCart = () => {
  if (cart.length === 0) {
    console.log('Your cart is empty.');
  } else {
    console.log('Your Cart:');
    cart.forEach((item, index) => {
      console.log(`${index + 1}. ${item.product.name} - Quantity: ${item.quantity}, Price per item: ${item.product.price.toFixed(2)} USD, Total: ${(item.product.price * item.quantity).toFixed(2)} USD`);
    });
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    console.log(`Total (before discounts): ${total.toFixed(2)} USD`);
  }
};

const listDiscounts = () => {
  console.log('Available Discounts:');
  console.log('1. Buy 1 Get 1 Free on Fashion items');
  console.log('2. 10% Off on Electronics');
};

const applyDiscounts = (total) => {
  let discountTotal = total;
  cart.forEach(item => {
    if (item.product.category === 'Fashion') {
      const freeItems = Math.floor(item.quantity / 2);
      discountTotal -= freeItems * item.product.price;
    } else if (item.product.category === 'Electronics') {
      discountTotal -= item.product.price * item.quantity * 0.1;
    }
  });
  return discountTotal;
};

const checkout = () => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const finalTotal = applyDiscounts(total);
  console.log(`Final Total in USD: ${finalTotal.toFixed(2)}`);
  rl.question('Would you like to view it in a different currency? (yes/no): ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      rl.question('Enter currency (EUR, GBP): ', (currency) => {
        let convertedTotal;
        if (currency === 'EUR') {
          convertedTotal = finalTotal * 0.85;
          console.log(`Final Total in EUR: ${convertedTotal.toFixed(2)}`);
        } else if (currency === 'GBP') {
          convertedTotal = finalTotal * 0.75;
          console.log(`Final Total in GBP: ${convertedTotal.toFixed(2)}`);
        } else {
          console.log('Currency not supported.');
        }
        rl.close();
      });
    } else {
      rl.close();
    }
  });
};

const mainMenu = () => {
  rl.prompt();

  rl.on('line', (line) => {
    const [command, productId, quantity] = line.trim().split(' ');
    switch (command) {
      case 'add':
        if (productId && quantity) {
          addToCart(productId, parseInt(quantity));
        } else {
          console.log('Please provide both a product ID and quantity.');
        }
        break;
      case 'view':
        viewCart();
        break;
      case 'discounts':
        listDiscounts();
        break;
      case 'checkout':
        checkout();
        break;
      case 'exit':
        rl.close();
        break;
      default:
        console.log('Unknown command. Please try again.');
        break;
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Exiting the application.');
    process.exit(0);
  });
};

mainMenu();
