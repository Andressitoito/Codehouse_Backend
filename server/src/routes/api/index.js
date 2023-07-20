/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
import products_router from './products/products.router.js'
import carts_router from './carts/carts.router.js'
import cookies_router from "./cookies/cookies.js";
import sessions_router from "./sessions/sessions.js";
import auth_router from "./auth/auth.js";
// import products_mongo from './products/products.mongo.js'
import ProductsMongoRouter from "./products/products.routerClass.js";
// import carts_mongo from './carts/carts.mongo.js'
import CartMongoRouter from "./carts/carts.routerClass.js";

/////////////////////////////
// VARIABLES
/////////////////////////////
const router = Router()

const productsMongoRouter = new ProductsMongoRouter();
const cartMongoRouter = new CartMongoRouter()

/////////////////////////////
// ROUTER USE
/////////////////////////////
router.use('/products', products_router)
// router.use('/products_mongo', products_mongo)
router.use('/products_mongo', productsMongoRouter.init)
router.use('/carts', carts_router)
// router.use('/carts_mongo', carts_mongo)
router.use('/carts_mongo', cartMongoRouter.init)
router.use('/cookies', cookies_router)
router.use('/sessions', sessions_router)
router.use('/auth', auth_router)

/////////////////////////////
// EXPORT ROUTER
/////////////////////////////
export default router
