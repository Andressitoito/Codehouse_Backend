/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import Cart from "../../dao/mongo/carts/models/Cart.js";
import mongoose from "mongoose";
import { redirect_unauthorized } from "../../middlewares/redirect_unauthorized.js";
const router = Router();

/////////////////////////////
// GET CARTS
/////////////////////////////
router.get("/", redirect_unauthorized, async (req, res, next) => {
	try {

		const cart = await Cart.findOne({ _id: req.user.cart_id }).populate(
			"products.product_id"
		);
		let total = 0;
		const products = cart.products.map((product) => {
			total += product.product_id.price * product.quantity;
			return {
				cid: req.user.cart_id,
				pid: product.product_id._id,
				title: product.product_id.title,
				description: product.product_id.description,
				stock: product.product_id.stock,
				thumbnail: product.product_id.thumbnail,
				price: product.product_id.price,
				quantity: product.quantity,
			};
		});

		return res.render("carts/mongo/cart", {
			title: "Product Cart",
			script: "edit-cart_mongo.js",
			products_data: products,
			total,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// GET CARTS
/////////////////////////////
router.get("/cart/bill", async (req, res, next) => {
	try {
		const cartId = req.user.cart_id;
		const cartObjectId = new mongoose.Types.ObjectId(cartId);

		const cart = await Cart.aggregate([{ $match: { _id: cartObjectId } }]);

		return res.render("carts/mongo/cart", {
			title: "Product Cart",
			script: "edit-cart_mongo.js",
		});
	} catch (error) {
		next(error);
	}
});

export default router;
