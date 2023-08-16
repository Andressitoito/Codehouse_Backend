/////////////////////////////
// IMPORTS
/////////////////////////////
import { productsService } from "../service/index.js";

class ProductsController {
	constructor() {
		this.productsService = productsService;
	}

	/////////////////////////////
	// GET /api/products
	/////////////////////////////
	getProducts = async (req, res, next) => {
		try {
			const products = await this.productsService.get();

			res.json({
				status: 200,
				success: true,
				message: `There are ${products.length} products`,
				products,
			});
		} catch (error) {
			next(error);
		}
	};
	
	/////////////////////////////
	// GET /api/products/:pid
	/////////////////////////////
	getProductsById = async (req, res, next) => {
		try {
			const id = req.params.pid;
			const product = await this.productsService.getById(id);

			res.json({
				status: 200,
				success: true,
				product,
			});
		} catch (error) {
			next(error);
		}
	};

	/////////////////////////////
	// POST /api/products
	/////////////////////////////
	createNewProduct = async (req, res, next) => {
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

			console.log("req.body contronller ", req.body)
			
			console.log('get in here to create product')
			const product = await this.productsService.create({
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
	};

	/////////////////////////////
	// PUT /api/products/:pid
	/////////////////////////////
	updateProduct = async (req, res, next) => {
		try {
			const dataToUpdate = req.body;
			const idToUpdate = req.params.pid;

			const product = await this.productsService.update(
				idToUpdate,
				dataToUpdate,
				{
					new: true,
				}
			);

			res.json({
				status: 201,
				success: true,
				product,
			});
		} catch (error) {
			next(error);
		}
	};

	/////////////////////////////
	// DELETE /api/products/:pid
	/////////////////////////////
	deleteProduct = async (req, res, next) => {
		try {
			const idToDelete = req.params.pid;

			const message = await this.productsService.delete(idToDelete);

			res.json({
				status: 200,
				success: true,
				message,
			});
		} catch (error) {
			next(error);
		}
	};
}

export default ProductsController;
