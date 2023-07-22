import ProductsDaoMongo from "../dao/mongo/products/products.dao.mongo.js";
import { ProductRepository } from "../repositories/products.repositories.js";

export const productMongoService = new ProductsDaoMongo()
// const productService = new ProductsDaoMongo() user
// const productService = new ProductsDaoMongo() cart

const productsSerice = new ProductRepository(new ProductsDaoMongo())

module.exports = {
 productsService
}
