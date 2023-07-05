/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import cart_manager from "../../Manager/Cart_manager.js";
import product_manager from "../../Manager/Product_manager.js";
import { redirect_unauthorized } from "../../middlewares/redirect_unauthorized.js";
const router = Router();

/////////////////////////////
// GET CART BY ID
/////////////////////////////
router.get("/cart/:cid", redirect_unauthorized, async (req, res, next) => {
	try {
		const cart_id = Number(req.params.cid);
		const cart = await cart_manager.getCartById(cart_id);

		const products_data_promises = cart.products.map(async (product) => {
			const product_promise = await product_manager.getProductById(product.pid);

			return {
				cid: cart_id,
				pid: product.pid,
				title: product_promise.title,
				description: product_promise.description,
				thumbnail: product_promise.thumbnail,
				price: product_promise.price,
				quantity: product.quantity,
				stock: product_promise.stock,
			};
		});

		const products_data = await Promise.all(products_data_promises);

		return res.render("carts/cart", {
			title: "Product Cart",
			products_data,
			script: "edit-cart.js",
		});
	} catch (error) {
		next(error);
	}
});

export default router;
