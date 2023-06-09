/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import Cart from "../../models/Cart.js";
const router = Router();

/////////////////////////////
// GET CARTS
/////////////////////////////
router.get("/", async (req, res, next) => {
	try {

		const cart = await Cart.find()

		console.log(cart.products)

		return res.render("carts/cart", {
			title: "Product Cart",
			script: "edit-cart_mongo.js",
		});
	} catch (error) {
		next(error);
	}
});

export default router;
