const readline = require("readline");

const data = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const products = [
  { id: "P001", name: "Laptop", price: 1000.0, category: "Electronics" },
  { id: "P002", name: "Smartphone", price: 500.0, category: "Electronics" },
  { id: "P003", name: "Shirt", price: 50.0, category: "Fashion" },
  { id: "P004", name: "Shoes", price: 80.0, category: "Fashion" },
  { id: "P005", name: "Watch", price: 150.0, category: "Accessories" },
];

const cart = [];
const discounts = [
  { id: "D001", description: "Buy 1 Get 1 Free on Fashion items" },
  { id: "D002", description: "10% off on Electronics" },
];

const showCommands = () => {
  console.log("Commands: add, view, discounts, checkout, help, exit");
};

const showHelp = () => {
  console.log(`
Available Commands:
- add <product_id> <quantity>: Add a product to the cart.
- view: View the items in the cart.
- discounts: View available discounts.
- checkout: Checkout and view the total price.
- help: Show this help message.
- exit: Exit the application.
`);
};

const addProductToCart = (productId, quantity) => {
  try {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new Error("Product not found.");
    }
    if (isNaN(quantity) || quantity <= 0) {
      throw new Error("Invalid quantity. Please enter a positive number.");
    }
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    console.log(`${quantity} x ${product.name} added to the cart.`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const viewCart = () => {
  try {
    if (cart.length === 0) {
      console.log("Your cart is empty.");
      return;
    }
    console.log("Your cart:");
    cart.forEach((item) =>
      console.log(
        `${item.quantity} x ${item.name} - $${item.price} each - Total: $${item.price * item.quantity}`
      )
    );
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    console.log(`Total: $${total}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const viewDiscounts = () => {
  try {
    if (discounts.length === 0) {
      console.log("No discounts available.");
      return;
    }
    console.log("Available discounts:");
    discounts.forEach((discount) =>
      console.log(`${discount.id}: ${discount.description}`)
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const checkout = () => {
  try {
    if (cart.length === 0) {
      console.log("Your cart is empty.");
      return;
    }
    let total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let discountsApplied = [];
    cart.forEach((item) => {
      if (item.category === "Fashion" && item.quantity >= 2) {
        discountsApplied.push("Buy 1 Get 1 Free on Fashion items");
        total -= item.price * Math.floor(item.quantity / 2);
      }
      if (item.category === "Electronics") {
        discountsApplied.push("10% off on Electronics");
        total -= item.price * item.quantity * 0.1;
      }
    });
    console.log("Checkout:");
    viewCart();
    console.log("Discounts applied:");
    discountsApplied.forEach((discount) => console.log(discount));
    console.log(`Total after discounts: $${total}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const handleInput = (input) => {
  const [command, ...args] = input.trim().split(" ");
  try {
    switch (command) {
      case "add":
        if (args.length !== 2) {
          throw new Error("Usage: add <product_id> <quantity>");
        }
        const productId = args[0];
        const quantity = parseInt(args[1], 10);
        addProductToCart(productId, quantity);
        break;
      case "view":
        viewCart();
        break;
      case "discounts":
        viewDiscounts();
        break;
      case "checkout":
        checkout();
        break;
      case "help":
        showHelp();
        break;
      case "exit":
        data.close();
        break;
      default:
        console.log("Unknown command.");
        showCommands();
        break;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
  promptUser();
};

const promptUser = () => {
  data.question("Enter a command: ", handleInput);
};

console.log("Welcome to the Mini E-commerce Cart System!");
showCommands();
promptUser();
