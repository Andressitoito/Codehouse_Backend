# E-Commerce Product Class Repository

This repository contains a server build with Node.js and Express, set up to run on port 8080. The server has endpoints for products and carts:

## Products

### GET Products

Returns all products.

- `/api/products`

![example image](./server/public/images/readme/products/get-products.jpeg)

### GET Product by ID

Returns a single product by ID.

- `/api/products/:pid`

![example image](./server/public/images/readme/products/get-product-by-id.jpeg)

### GET Product by ID Error

Returns an error message if a product with the specified ID cannot be found.

- `/api/products/:pid`

![example image](./server/public/images/readme/products/get-product-by-id-error.jpeg)

### POST Product

Adds a new product.

- `/api/products/`

![example image](./server/public/images/readme/products/post-product.jpeg)

### POST Product Error Repeated Product

Returns an error message if there is an issue adding a new product.

- `/api/products/`

![example image](./server/public/images/readme/products/post-product-error-repeated.jpeg)

### POST Product Error Wrong Prop

Returns an error message if there is an issue adding a new product.

- `/api/products/`

![example image](./server/public/images/readme/products/post-product-error-wrong-prop.jpeg)

### PUT Update Product

Updates an existing product.

- `/api/products/:pid`

![example image](./server/public/images/readme/products/put-update-product.jpeg)

### PUT Update Product Error

Returns an error message if there is an issue updating an existing product.

- `/api/products/:pid`

![example image](./server/public/images/readme/products/put-update-product.jpeg)

### DELETE Product

Deletes an existing product.

- `/api/products/:pid`

![example image](./server/public/images/readme/products/delete-product.jpeg)

### DELETE Product Error

Returns an error message if there is an issue deleting an existing product.

- `/api/products/:pid`

![example image](./server/public/images/readme/products/delete-product-error.jpeg)

## Carts

### GET Carts

Returns all carts.

- `/api/carts/`

![example image](./server/public/images/readme/carts/get-carts.jpeg)

### GET Cart by ID

Returns a single cart by ID.

- `/api/carts/:cid`

![example image](./server/public/images/readme/carts/get-cart-by-id.jpeg)

### GET Cart by ID Error

Returns an error message if a cart with the specified ID cannot be found.

- `/api/carts/:cid`

![example image](./server/public/images/readme/carts/get-cart-by-id-error.jpeg)

### POST Empty Cart

Adds a new empty cart.

- `/api/carts/`

![example image](./server/public/images/readme/carts/create-empty-cart.jpeg)

### UPDATE Product in Cart

Updates the quantity of a product in a cart.

- `/api/carts/:cid/product/:pid/:units`

![example image](./server/public/images/readme/carts/update-product-in-cart.jpeg)

### UPDATE Product in Cart Error Not enough stock

Returns an error message if there is no enough stock of a product to add in a cart.

- `/api/carts/:cid/product/:pid/:units`

![example image](./server/public/images/readme/carts/update-product-in-cart-error-stock.jpeg)

### UPDATE Product in Cart Error Id error

Returns an error if a cart with the specified ID cannot be found.

- `/api/carts/:cid/product/:pid/:units`

![example image](./server/public/images/readme/carts/update-product-in-cart-error-not-found.jpeg)

### DELETE Product from Cart

Deletes a product from a cart.

- `/api/carts/:cid/product/:pid/:units`

![example image](./server/public/images/readme/carts/delete-product-from-cart.jpeg)

### DELETE Product from Cart Error

Returns an error message if is trying to delete more items than the actual stock from a cart.

- `/api/carts/:cid/product/:pid/:units`

![example image](./server/public/images/readme/carts/delete-product-from-cart.jpeg)

To use this repository, clone it to your local machine and run `npm install` to install the necessary dependencies. Then, start the server with `npm start`.
