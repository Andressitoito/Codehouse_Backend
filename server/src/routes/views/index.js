/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import products from './products.js'
import carts from './cart.js'
import chat from './chat.js'
import home from './home.js'

const router = Router()

/////////////////////////////
// ROUTES
/////////////////////////////
router.use('/products', products)
router.use('/carts', carts)
router.use('/chat', chat)
router.use('/', home)

export default router