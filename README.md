# E-Commerce Product Class Repository

This repository contains a server build with Node.js and Express, set up to run on port 8080. The server has four endpoints:

- `/api/products/:pid`
- `/api/products`
- `/api/carts/:cid`
- `/api/carts`

Each endpoint is paired with a respective class: `productManager` for products and `cartManager` for carts.

## `productManager` Class

The `productManager` class has the following features:

1. `getProducts()`: retrieves all products
2. `addProduct(product)`: adds a new product
3. `getProductById(id)`: retrieves a product by ID
4. `updateProductById(id, product)`: updates a product by ID
5. `deleteProduct()`: deletes a product

## `cartManager` Class

The `cartManager` class has the following features:

1. `addCart(cart)`: adds a new cart
2. `getCarts()`: retrieves all carts
3. `getCartById(id)`: retrieves a cart by ID

---

To use this repository, clone it to your local machine and run `npm install` to install the necessary dependencies. Then, start the server with `npm start`.