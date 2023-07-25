import CartsDaoMongo from "../dao/mongo/carts/carts.dao.mongo.js";
import ProductsDaoMongo from "../dao/mongo/products/products.dao.mongo.js";

import { CartMongoRepository } from "../repositories/carts.repositories.js";
import { ProductMongoRepository } from "../repositories/products.repositories.js";

export const productsService = new ProductMongoRepository(new ProductsDaoMongo());
export const cartsService = new CartMongoRepository(new CartsDaoMongo())

// export const productMongoService = new ProductsDaoMongo();
// const productService = new ProductsDaoMongo() user
// const productService = new ProductsDaoMongo() cart


