let ProductDao;
let CartsDao;

async function loadMongoModules() {
  switch ("MONGO") {
    case "MONGO":
      const productModule = await import("./mongo/products/products.dao.mongo.js");
      const cartsModule = await import("./mongo/carts/carts.dao.mongo.js");
      ProductDao = productModule.default;
      CartsDao = cartsModule.default;
      break;
    // Add more cases for other options if needed
    default:
      break;
  }
}

loadMongoModules();

export { ProductDao, CartsDao };


// import { config: { persistence } } from "../config/config.js";
// import ProductsDaoMongo from "./mongo/products/products.dao.mongo";

// let productDaoMongo
// let usersDaoMongo

// switch (persistence) {
//  case "MONGO":
//   productsDaoMongo = require('./mongo/products/products.dao.mongo')
//   usersDaoMongo = require('')

//   break
// }