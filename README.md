# E-Commerce Product Class Repository

## Introduction

This repository contains the code for a product class in an e-commerce database. The class is designed to manage products in the database and has five main methods for managing product data.

## Methods

### `addProduct(product)`
The `addProduct()` method is used to add a new product to the database. It takes a product object as an argument and adds it to the database.

### `getProducts()`
The `getProducts()` method is used to retrieve all the products that have been created and stored in the database. It returns an array of all the products in the database.

### `getProductById(id)`
The `getProductById()` method is used to retrieve a specific product from the database. It takes an id as an argument and returns the product that matches that id.

### `updateProduct(id, product)`
The `updateProduct()` method is used to update a specific product in the database. It takes an id and a product object as arguments and updates the product that matches that id.

### `deleteProduct(id)`
The `deleteProduct()` method is used to delete a specific product from the database. It takes an id as an argument and deletes the product that matches that id.

## Usage
To use this class, simply import it into your project and create a new instance of the product class. Then, you can call any of the five methods to manage product data. The `addProduct()` method will add a new product to the database, the `getProducts()` method will retrieve all products in the database, the `getProductById()` method will retrieve a specific product from the database, the `updateProduct()` method will update a specific product in the database, and the `deleteProduct()` method will delete a specific product from the database.

Now all data is saved in a file that will be created if not exist using fs file system module, in a file called "products.json" in a folder called "data". And all calls and data are updated and managed using try-catch blocks also using fs.promises and their methods.