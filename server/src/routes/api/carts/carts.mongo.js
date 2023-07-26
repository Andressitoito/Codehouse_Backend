/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import CartController from "../../../controllers/carts.controller.js";

const router = Router();
const {
	getCarts,
	getCartById,
	getBillCart,
	createCart,
	updateCart,
	deleteProductsInCart,
} = new CartController();

/////////////////////////////
// GET /api/carts
/////////////////////////////
router.get("/", getCarts);

/////////////////////////////
// GET /api/carts/:cid
/////////////////////////////
router.get("/:cid", getCartById);

/////////////////////////////
// POST /api/carts
/////////////////////////////
router.post("/", createCart);

/////////////////////////////
// PUT /api/carts/:cid/product/:pid/:units
/////////////////////////////
router.put("/:cid/product/:pid/:units", updateCart);

/////////////////////////////
// DELETE /api/carts/:cid/product/:pid/:units
/////////////////////////////
router.delete("/:cid/product/:pid/:units", deleteProductsInCart);

/////////////////////////////
// GET /api/carts/bills/cid
/////////////////////////////
router.get("/bills/:cid", getBillCart);

export default router;
