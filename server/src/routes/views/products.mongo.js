/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import __dirname from "../../utils/utils.js";
import Product from "../../models/Products.js";
const router = Router();

/////////////////////////////
// GET ALL PRODUCTS
/////////////////////////////
router.get("/cards", async (req, res, next) => {
	try {
		const page = req.query.page ?? 1;
		const limit = req.query.limit ?? 6;
		const query = {};

		if (req.query.title) {
			query.title = new RegExp(req.query.title, "i");
		}

		const products = await Product.paginate(query, { limit, page });
		// console.log(products);
		const { docs, ...data } = products;

		// console.log(data);

		return res.render("products/mongo/products-cards", {
			title: "Products Cards",
			script: "product-cards_mongo.js",
			products: docs,
			data,
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
		console.log("add mongo product");
		if (req.session?.role === 1) {
			return res.render("products/mongo/add-product", {
				title: "Add product to cart",
				script: "add_mongo_product.js",
			});
		} else {
			return res.redirect("/");
		}
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// GET CARD DETAIL
/////////////////////////////
router.get("/:pid", async (req, res, next) => {
	try {
		// const product = await product_manager.getProductById(product_id);

		const product = await Product.find({ _id: req.params.pid });

		return res.render("products/mongo/add-product-to-cart", {
			script: "product-detail_mongo.js",
			product: product[0],
		});
	} catch (error) {
		next(error);
	}
});

export default router;
