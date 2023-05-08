/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
import product_manager from "../../../classes/product_manager.js";

const router = Router();

/////////////////////////////
// GET /api/products
/////////////////////////////
router.get("/", async (req, res, next) => {
	try {
		let query = parseInt(req.query.limit);

		let products = await product_manager.getProducts(query);
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
		let id = parseInt(req.params.pid);
		let product = await product_manager.getProductById(id);

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
router.post("/", async (req, res, next) => {
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

		// if (title && description && price && thumbnail) {
			const product = await product_manager.addProduct({
				title,
				description,
				price,
				thumbnail,
				stock,
			});

			res.json({
				status: 201,
				success: true,
				product,
			});
		// } else {
		// 	throw "Check data sent";
		// }
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// PUT /api/products/:pid
/////////////////////////////
router.put("/:pid", async (req, res, next) => {
	try {
		const dataToUpdate = req.body;
		const idToUpdate = Number(req.params.pid);

		const products = await product_manager.getProducts();

		let isRepeated = products.find((product) => product.title === req.body.title);

		if (isRepeated.id !== idToUpdate) {
			const error = new Error(
				`This title: '${req.body.title}' already exists at id: ${isRepeated.id}`
			);
			error.status = 422;
			throw error;
		}

		const product = await product_manager.updateProduct(idToUpdate, dataToUpdate);

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
		const idToDelete = Number(req.params.pid);
		const message = await product_manager.deleteProduct(idToDelete);

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