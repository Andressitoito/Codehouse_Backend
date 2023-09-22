/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import products from './products.js'
import products_mongo from './products.mongo.js'
import carts  from './cart.js'
import carts_mongo  from './cart.mongo.js'
import user_premium  from './premium.js'
import chat from './chat.js'
import home from './home.js'

const router = Router()

/////////////////////////////
// ROUTES
/////////////////////////////
router.use('/products', products)
router.use('/products_mongo', products_mongo)
router.use('/carts', carts)
router.use('/carts_mongo', carts_mongo)
router.use('/user_premium', user_premium)
router.use('/chat', chat)
router.use('/', home)

export default router