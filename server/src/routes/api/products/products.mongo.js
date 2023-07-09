/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import productValidator from "../../../middlewares/product_validator.js";
import passport_call from "../../../middlewares/passport_call.js";
import { unauthorized_role } from "../../../middlewares/unauhorized_role.js";
import ProductsMongoController from "../../../controllers/products_mongo.controller.js";

const router = Router();

const {
	getProducts,
	getProductsById,
	createNewProduct,
	updateProduct,
	deleteProduct,
} = new ProductsMongoController();

/////////////////////////////
// GET /api/products
/////////////////////////////
router.get("/", getProducts);

/////////////////////////////
// GET /api/products/:pid
/////////////////////////////
router.get("/:pid", getProductsById);

/////////////////////////////
// POST /api/products
/////////////////////////////
router.post("/", productValidator, unauthorized_role,createNewProduct);

/////////////////////////////
// PUT /api/products/:pid
/////////////////////////////
router.put("/:pid", passport_call("jwt"), unauthorized_role, updateProduct);

/////////////////////////////
// DELETE /api/products/:pid
/////////////////////////////

router.delete("/:pid", unauthorized_role, deleteProduct);

export default router;
