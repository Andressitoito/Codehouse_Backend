/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import CartController from "../../../controllers/carts.controller.js";
import handlePolicies from "../../../middlewares/handlePolicies.js";

const router = Router();
const {
	getCarts,
	getCartById,
	getBillCart,
	createCart,
	updateCart,
	deleteProductsInCart,
	purchase
} = new CartController();

/////////////////////////////
// GET /api/carts
/////////////////////////////
router.get("/", handlePolicies(["", "USER", "ADMIN"]), getCarts);

/////////////////////////////
// GET /api/carts/:cid
/////////////////////////////
router.get("/:cid", handlePolicies(["PUBLIC", "USER", "ADMIN"]), getCartById);

/////////////////////////////
// POST /api/carts
/////////////////////////////
router.post("/", handlePolicies(["USER", "ADMIN"]), createCart);

/////////////////////////////
// PUT /api/carts/:cid/product/:pid/:units
/////////////////////////////
router.put(
	"/:cid/product/:pid/:units",
	handlePolicies(["USER", "ADMIN"]),
	updateCart
);

/////////////////////////////
// DELETE /api/carts/:cid/product/:pid/:units
/////////////////////////////
router.delete(
	"/:cid/product/:pid/:units",
	handlePolicies(["USER", "ADMIN"]),
	deleteProductsInCart
);

/////////////////////////////
// GET /api/carts/bills/cid
/////////////////////////////
router.get("/bills/:cid", handlePolicies(["USER", "ADMIN"]), getBillCart);

/////////////////////////////
// PUT /api/carts/:cid/purchase
/////////////////////////////
router.get(
	"/:cid/purchase",
	handlePolicies(["USER", "ADMIN"]),
	purchase
);

export default router;
