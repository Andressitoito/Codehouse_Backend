/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import CartFsController from "../../../controllers/cart_fs.controller.js";

const router = Router();
const {
	getCartsFs,
	getCartByIdFs,
	createCartFs,
	updateProductInCartByIdFs,
	deleteProductInCartyIdFs,
} = new CartFsController();

/////////////////////////////
// GET /api/carts
/////////////////////////////
router.get("/", getCartsFs);

/////////////////////////////
// GET /api/carts/:cid
/////////////////////////////
router.get("/:cid", getCartByIdFs);

/////////////////////////////
// POST /api/carts
/////////////////////////////
router.post("/", createCartFs);

/////////////////////////////
// PUT /api/carts/:cid/product/:pid/:units
/////////////////////////////
router.put("/:cid/product/:pid/:units", updateProductInCartByIdFs);

/////////////////////////////
// DELETE /api/carts/:cid/product/:pid/:units
/////////////////////////////
router.delete("/:cid/product/:pid/:units", deleteProductInCartyIdFs);

export default router;
