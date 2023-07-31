/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import productValidator from "../../../middlewares/product_validator.js";
import auth from "../../../middlewares/auth.js";
import { redirect_unauthorized } from "../../../middlewares/redirect_unauthorized.js";
import ProductsFsController from "../../../controllers/products_fs.controller.js";

const router = Router();
const {
	getProducts,
	getProductsById,
	createProduct,
	updateProduct,
	deleteProduct,
} = new ProductsFsController();

/////////////////////////////
// GET /api/products
/////////////////////////////
router.get("/", redirect_unauthorized, getProducts);

/////////////////////////////
// GET /api/products/:pid
/////////////////////////////
router.get("/:pid", getProductsById);

/////////////////////////////
// POST /api/products
/////////////////////////////
router.post("/", auth, productValidator, createProduct);

/////////////////////////////
// PUT /api/products/:pid
/////////////////////////////
router.put("/:pid", updateProduct);

/////////////////////////////
// DELETE /api/products/:pid
/////////////////////////////
router.delete("/:pid", deleteProduct);

export default router;
