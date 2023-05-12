import { Router } from "express";
import products_router from './products/products.router.js'
import carts_router from './carts/carts.router.js'

const router = Router()

router.use('/products', products_router)
router.use('/carts', carts_router)

export default router
