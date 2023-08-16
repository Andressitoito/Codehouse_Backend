import CartMongoRepository from "../repositories/carts.repositories.js";
import ProductMongoRepository from "../repositories/products.repositories.js";
import UsersMongoRepository from "../repositories/users.repositories.js";

import CartsDaoMongo from "../dao/mongo/carts/carts.dao.mongo.js";
import ProductsDaoMongo from "../dao/mongo/products/products.dao.mongo.js";
import UsersDaoMongo from "../dao/mongo/users/users.dao.mongo.js";

export const productsService = new ProductMongoRepository(
	new ProductsDaoMongo()
);
export const cartsService = new CartMongoRepository(new CartsDaoMongo());
export const usersService = new UsersMongoRepository(new UsersDaoMongo());
