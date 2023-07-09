/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import CartFsController from "../../../controllers/cart_fs.controller.js";

const router = Router();
const {
	getCarts,
	getCartById,
	createCart,
	updateProductInCartById,
	deleteProductInCartyId,
} = new CartFsController();

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
router.put("/:cid/product/:pid/:units", updateProductInCartById);

/////////////////////////////
// DELETE /api/carts/:cid/product/:pid/:units
/////////////////////////////
router.delete("/:cid/product/:pid/:units", deleteProductInCartyId);

export default router;
