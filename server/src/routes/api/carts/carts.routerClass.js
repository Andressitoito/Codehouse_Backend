/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import RouterClass from "../router.js";
import CartMongoController from "../../../controllers/cart_mongo.controller.js";

const {
	getCarts,
	getCartById,
	getBillCart,
	createCart,
	updateCart,
	deleteProductsInCart,
} = new CartMongoController();

/////////////////////////////
// CLASS & METHODS
/////////////////////////////
class CartMongoRouter extends RouterClass {
	init() {
		/////////////////////////////
		// GET /api/carts
		/////////////////////////////
		this.get("/", getCarts);

		/////////////////////////////
		// GET /api/carts/:cid
		/////////////////////////////
		this.get("/:cid", getCartById);

		/////////////////////////////
		// POST /api/carts
		/////////////////////////////
		this.post("/", createCart);

		/////////////////////////////
		// PUT /api/carts/:cid/product/:pid/:units
		/////////////////////////////
		this.put("/:cid/product/:pid/:units", updateCart);

		/////////////////////////////
		// DELETE /api/carts/:cid/product/:pid/:units
		/////////////////////////////
		this.delete("/:cid/product/:pid/:units", deleteProductsInCart);

		/////////////////////////////
		// GET /api/carts/bills/cid
		/////////////////////////////
		this.get("/bills/:cid", getBillCart);
	}
}

export default CartMongoRouter;
