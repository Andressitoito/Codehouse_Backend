/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
import cookies_router from "./cookies/cookies.js";
import sessions_router from "./sessions/sessions.js";
import auth_router from "./auth/auth.js";
import ProductsMongoRouter from "./products/products.routerClass.js";
import CartMongoRouter from "./carts/carts.routerClass.js";

import productsRouter from "./products/products.mongo.js";
import cartRouter from "./carts/carts.mongo.js";

/////////////////////////////
// VARIABLES
/////////////////////////////
const router = Router();

const productsMongoRouter = new ProductsMongoRouter();
const cartMongoRouter = new CartMongoRouter();

/////////////////////////////
// ROUTER USE
/////////////////////////////
// router.use('/products_mongo', productsMongoRouter.init)
// router.use('/carts_mongo', cartMongoRouter.init)

router.use("/products_mongo", productsRouter);
router.use("/carts_mongo", cartRouter);
router.use("/cookies", cookies_router);
router.use("/sessions", sessions_router);
router.use("/auth", auth_router);

/////////////////////////////
// EXPORT ROUTER
/////////////////////////////
export default router;
