/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import productValidator from "../../../middlewares/product_validator.js";
import passport_call from "../../../middlewares/passport_call.js";
import ProductsController from "../../../controllers/products.controller.js";
import handlePolicies from "../../../middlewares/handlePolicies.js";

const router = Router();

const {
	getProducts,
	getProductsById,
	createNewProduct,
	updateProduct,
	deleteProduct,
} = new ProductsController();

/////////////////////////////
// GET /api/products
/////////////////////////////
router.get("/", handlePolicies(["", "USER", "ADMIN"]), getProducts);

/////////////////////////////
// GET /api/products/:pid
/////////////////////////////
router.get("/:pid", handlePolicies(["", "USER", "ADMIN"]), getProductsById);

/////////////////////////////
// POST /api/products
/////////////////////////////
router.post(
	"/",
	productValidator,
	handlePolicies(["USER", "ADMIN"]),
	createNewProduct
);

/////////////////////////////
// PUT /api/products/:pid
/////////////////////////////
router.put(
	"/:pid",
	passport_call("jwt"),
	handlePolicies(["USER", "ADMIN"]),
	updateProduct
);

/////////////////////////////
// DELETE /api/products/:pid
/////////////////////////////
router.delete("/:pid", handlePolicies(["USER", "ADMIN"]), deleteProduct);

export default router;
