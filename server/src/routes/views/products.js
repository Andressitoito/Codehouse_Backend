/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import product_manager from "../../Manager/Product_manager.js";
import __dirname from "../../utils/utils.js";
const router = Router();

router.get("/cards", async (req, res) => {
	console.log(__dirname);
	try {
		let products = await product_manager.getProducts();

		return res.render("products/products-cards", {
			products: products.reverse(),
			title: "Products Cards",
		});
	} catch (error) {
		next(error);
	}
});

router.get("/add-product", async (req, res, next) => {
	try {
		return res.render("products/add-product", {
			title: "Add product to cart",
			script_product: "add-product.js",
		});
	} catch (error) {
		next(error);
	}
});

export default router;
