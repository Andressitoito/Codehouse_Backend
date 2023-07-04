/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import Cart from "../../models/Cart.js";
import Product from "../../models/Products.js";
import mongoose from "mongoose";
const router = Router();

/////////////////////////////
// GET CARTS
/////////////////////////////
router.get("/", async (req, res, next) => {
	try {
		const cart = await Cart.findOne({ _id: "648276ab74476c69be6576b3" }).populate(
			"products.product_id"
		);
			let total = 0
		const products = cart.products.map((product) => {
			total += product.product_id.price * product.quantity
			return {
				cid: "648276ab74476c69be6576b3",
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
			total
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
		const cartId = "648276ab74476c69be6576b3";
		const cartObjectId = new mongoose.Types.ObjectId(cartId);

		const cart = await Cart.aggregate([{ $match: { _id: cartObjectId } }]);

		console.log(cart);

		return res.render("carts/mongo/cart", {
			title: "Product Cart",
			script: "edit-cart_mongo.js",
			// products_data: products
		});
	} catch (error) {
		next(error);
	}
});

export default router;
