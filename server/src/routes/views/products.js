/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import product_manager from "../../Manager/Product_manager.js";
import __dirname from "../../utils/utils.js";
const router = Router();

/////////////////////////////
// GET ALL PRDUCTS
/////////////////////////////
router.get("/cards", async (req, res) => {
	try {
		let products = await product_manager.getProducts();

		return res.render("products/products-cards", {
			products: products,
			title: "Products Cards",
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// ADD PRODUCT FORM
/////////////////////////////
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

/////////////////////////////
// GET CARD DETAIL
/////////////////////////////
router.get("/:pid", async (req, res, next) => {
	try {
		const product_id = Number(req.params.pid);
		const product = await product_manager.getProductById(product_id);

		return res.render("products/add-product-to-cart", {
			script_product_detail: "product-detail.js",
			product,
		});
	} catch (error) {
		next(error);
	}
});

export default router;
