/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
import cart_manager from "../../../Manager/Cart_manager.js";
import product_manager from "../../../Manager/Product_manager.js";
import Cart from "../../../models/Cart.js";
import Product from "../../../models/Products.js";

const router = Router();

/////////////////////////////
// GET /api/carts
/////////////////////////////
router.get("/", async (req, res, next) => {
	try {
		let carts = await Cart.find();

		console.log(carts);
		res.json({
			status: 200,
			success: true,
			message: `There are ${carts.length} carts`,
			carts,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// GET /api/carts/:cid
/////////////////////////////
router.get("/:cid", async (req, res, next) => {
	try {
		let cid = parseInt(req.params.cid);

		let cart = await Cart.find({ _id: cid });

		res.json({
			status: 200,
			success: true,
			cart,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// POST /api/carts
/////////////////////////////
router.post("/", async (req, res, next) => {
	try {
		console.log("entra aca en el post");
		console.log(req.body);
		const cart = await Cart.create(req.body);

		res.json({
			status: 200,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// PUT /api/carts/:cid/product/:pid/:units
/////////////////////////////
router.put("/:cid/product/:pid/:units", async (req, res, next) => {
	try {
		const cid = req.params.cid;
		const product_id = req.params.pid;
		const product_quantity = req.params.units;

		if (product_quantity <= 0) {
			const error = new Error(`Invalid product_quantity: ${product_quantity}`);
			error.status = 422;
			throw error;
		}
		let cart = await Cart.findById(cid);

		let product = await Product.findById(product_id);
		if (!product) {
			cart.products.push({ product_id: product._id, quantity: 1 });
		} else {


			let totalUnits = Number(product.stock) + Number(cart.quantity);
			console.log(totalUnits);

			if (product_quantity <= totalUnits) {
				console.log("do something men");
				const stock = totalUnits - product_quantity;

				product = await Product.findByIdAndUpdate(
					product_id,
					{ stock: stock },
					{ new: true }
				);
				console.log("///////////////////////");
				console.log(product.stock);
				console.log("///////////////////////");

				cart = await Cart.findByIdAndUpdate(
					cid,
					{ quantity: product_quantity },
					{ new: true }
				);
				console.log(cart.quantity);

				// // UPDATE STOCK IN CART FILE
				// const product_data = {
				// 	pid: product_id,
				// 	quantity: product_quantity,
				// };

				// cart = await cart_manager.updateCart({ cid, product_data });

				// // UPDATE STOCK IN PRODUCT FILE
				// console.log("BEFORE  ", product);

				// product = await product_manager.updateProduct(product_id, {
				// 	stock: totalUnits - product_quantity,
				// });

				// console.log("AFTER  ", product);
			} else {
				let error = new Error(
					`Not enough stock. There are ${product.stock} units available`
				);
				error.status = 422;
				throw error;
			}
		}
		return res.json({
			status: 200,
			success: true,
			cart,
			stock: `There are ${product.stock} units available`,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// DELETE /api/carts/:cid/product/:pid/:units
/////////////////////////////
router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
	try {
		const cid = Number(req.params.cid);
		const product_id = Number(req.params.pid);
		const product_quantity = Number(req.params.units);
		let product = await product_manager.getProductById(product_id);
		let cart = await cart_manager.getCartById(cid);

		if (product_quantity <= 0) {
			const error = new Error(`Invalid product_quantity: ${product_quantity}`);
			error.status = 422;
			throw error;
		}

		const product_cart = cart.products.find(
			(product) => product.pid === product_id
		);

		if (!product_cart) {
			const error = new Error(`Invalid id product id: ${product_id}`);
			error.status = 422;
			throw error;
		}

		if (product_cart.quantity - product_quantity >= 0) {
			// UPDATE STOCK IN CART FILE
			const product_data = {
				pid: product_id,
				quantity: product_quantity,
			};
			cart = await cart_manager.deleteProductCart({ cid, product_data });

			// UPDATE STOCK IN PRODUCT FILE
			product = await product_manager.updateProduct(product_id, {
				stock: Number(product.stock) + Number(product_quantity),
			});
		} else {
			const error = new Error(
				`There are ${product_cart.quantity} items in cart, cannot delete ${product_quantity} items`
			);
			error.status = 422;
			throw error;
		}

		res.json({
			status: 200,
			success: true,
			cart,
			stock: `There are ${product.stock} units in stock`,
		});
	} catch (error) {
		next(error);
	}
});

export default router;
