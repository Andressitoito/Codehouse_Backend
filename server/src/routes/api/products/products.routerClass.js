/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import RouterClass from "../router.js";
import productValidator from "../../../middlewares/product_validator.js";
import passport_call from "../../../middlewares/passport_call.js";
import { unauthorized_role } from "../../../middlewares/unauhorized_role.js";
import ProductsMongoController from "../../../controllers/products_mongo.controller.js";

const {
	getProducts,
	getProductsById,
	createNewProduct,
	updateProduct,
	deleteProduct,
} = new ProductsMongoController();

/////////////////////////////
// CLASS & METHODS
/////////////////////////////
class ProductsMongoRouter extends RouterClass {
	init() {
		/////////////////////////////
		// GET /api/products
		/////////////////////////////
		this.get("/", ["PUBLIC", "USER"], getProducts);

		/////////////////////////////
		// GET /api/products/:pid
		/////////////////////////////
		this.get("/:pid", ["PUBLIC", "USER"], getProductsById);

		/////////////////////////////
		// POST /api/products
		/////////////////////////////
		this.post(
			"/",
			["ADMIN", "USER_PREMIUM"],
			productValidator,
			unauthorized_role,
			createNewProduct
		);

		/////////////////////////////
		// PUT /api/products/:pid
		/////////////////////////////
		this.put(
			"/:pid",
			["ADMIN", "USER_PREMIUM"],
			passport_call("jwt"),
			unauthorized_role,
			updateProduct
		);

		/////////////////////////////
		// DELETE /api/products/:pid
		/////////////////////////////

		this.delete(
			"/:pid",
			["ADMIN", "USER_PREMIUM"],
			unauthorized_role,
			deleteProduct
		);
	}
}

export default ProductsMongoRouter;

