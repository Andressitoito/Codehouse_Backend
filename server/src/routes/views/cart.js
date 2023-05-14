/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import cart_manager from "../../Manager/Cart_manager.js";
import product_manager from "../../Manager/Product_manager.js";
const router = Router();

/////////////////////////////
// MAIN HOME
/////////////////////////////
router.get("/cart", async (req, res, next) => {
	try {
		const cart = await cart_manager.getCartById(1);

		const products_data_promises = cart.products.map(async (product) => {
			const product_promise = await product_manager.getProductById(product.pid);

			return {
				title: product_promise.title,
				description: product_promise.description,
				thumbnail: product_promise.thumbnail,
				price: product_promise.price,
				quantity: product.quantity,
			};
		});

		const products_data = await Promise.all(products_data_promises);

		console.log(products_data);

		return res.render("carts/cart", {
			title: "Product Cart",
   products_data
		});
	} catch (error) {
		next(error);
	}
});

export default router;

