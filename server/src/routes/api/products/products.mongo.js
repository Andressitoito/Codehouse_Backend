/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
// import product_manager from "../../../Manager/Product_manager.js";
import productValidator from "../../../middlewares/product_validator.js";
import Product from "../../../models/Products.js";
import passport from "passport";
import passport_call from "../../../middlewares/passport_call.js";

const router = Router();

/////////////////////////////
// GET /api/products
/////////////////////////////
router.get("/", passport_call('jwt'), async (req, res, next) => {
	try {
		const products = await Product.find();

		res.json({
			status: 200,
			success: true,
			message: `There are ${products.length} products`,
			products,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// GET /api/products/:pid
/////////////////////////////
router.get("/:pid", async (req, res, next) => {
	try {
		const id = req.params.pid;
		const product = await Product.findById(id);

		res.json({
			status: 200,
			success: true,
			product,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// POST /api/products
/////////////////////////////
router.post(
	"/",
	// passport.authenticate("jwt", { session: false }),
	passport_call('jwt'),
	productValidator,
	async (req, res, next) => {
		try {
			let { title, description, price, thumbnail, stock } = req.body;

			title = title ?? null;
			description = description ?? null;
			price = price ?? null;
			thumbnail = thumbnail ?? null;

			const validProps = ["title", "description", "price", "thumbnail", "stock"];
			for (const prop in req.body) {
				if (!validProps.includes(prop)) {
					throw `wrong data sent '${prop}`;
				}
			}

			const product = await Product.create({
				title,
				description,
				price,
				thumbnail: "https://picsum.photos/400/200",
				stock,
			});

			res.json({
				status: 201,
				success: true,
				product,
			});
		} catch (error) {
			next(error);
		}
	}
);

/////////////////////////////
// PUT /api/products/:pid
/////////////////////////////
router.put("/:pid", async (req, res, next) => {
	try {
		const dataToUpdate = req.body;
		const idToUpdate = req.params.pid;

		const product = await Product.findByIdAndUpdate(idToUpdate, dataToUpdate, {
			new: true,
		});

		res.json({
			status: 201,
			success: true,
			product,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// DELETE /api/products/:pid
/////////////////////////////
router.delete("/:pid", async (req, res, next) => {
	try {
		const idToDelete = req.params.pid;

		const message = await Product.findByIdAndDelete(idToDelete);

		res.json({
			status: 200,
			success: true,
			message,
		});
	} catch (error) {
		next(error);
	}
});

export default router;
