import { Router } from "express";
import products_router from './products/products.router.js'
import products_mongo from './products/products.mongo.js'
import carts_router from './carts/carts.router.js'
import carts_mongo from './carts/carts.mongo.js'
import cookies_router from "./cookies/cookies.js";
import sessions_router from "./sessions/sessions.js";

const router = Router()

router.use('/products', products_router)
router.use('/products_mongo', products_mongo)
router.use('/carts', carts_router)
router.use('/carts_mongo', carts_mongo)
router.use('/cookies', cookies_router)
router.use('/sessions', sessions_router)

export default router
