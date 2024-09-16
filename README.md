# QuriousBit-Games

## Mini E-commerce Cart System
### This is a command-line application for managing a mini e-commerce cart system. The application allows users to add products to a cart, view the cart, check available discounts, and proceed to checkout with applied discounts.

## Features
- Add products to the cart
- Remove products from the cart
- View current items in the cart
- Calculate total price with support for multiple currencies
- Apply discounts dynamically
- Checkout to see the final price with applied discounts

## Commands
- add <product_id> <quantity>: Adds a specified quantity of a product to the cart.
- view: Displays the items currently in the cart.
- discounts: Lists the available discounts.
- checkout: Proceeds to checkout, applying any relevant discounts and showing the total price.
- help: Displays the help message with available commands and usage.
- exit: Exits the application.

## Example Usage
### Start the application:
- node index.js

### View the available commands:
- Commands: add, view, discounts, checkout, help, exit

### Add a product to the cart:
- Enter a command: add P001 1
1 x Laptop added to the cart.

### View the cart:
- Enter a command: view
Your cart:
1 x Laptop - $1000 each - Total: $1000
Total: $1000

### Check available discounts:
- Enter a command: discounts
Available discounts:
D001: Buy 1 Get 1 Free on Fashion items
D002: 10% off on Electronics

### Proceed to checkout:
- Enter a command: checkout
Checkout:
Your cart:
1 x Laptop - $1000 each - Total: $1000
Total: $1000
Discounts applied:
Total after discounts: $900

### Get help with commands:
- Enter a command: help
Available Commands:
- add <product_id> <quantity>: Add a product to the cart.
- view: View the items in the cart.
- discounts: View available discounts.
- checkout: Checkout and view the total price.
- help: Show this help message.
- exit: Exit the application.

### Exit the application:
- Exit

## Products List
- P001: Laptop - $1000.00 - Electronics
- P002: Smartphone - $500.00 - Electronics
- P003: Shirt - $50.00 - Fashion
- P004: Shoes - $80.00 - Fashion
- P005: Watch - $150.00 - Accessories

## Discounts
- D001: Buy 1 Get 1 Free on Fashion items
- D002: 10% off on Electronics



