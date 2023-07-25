/////////////////////////////
// IMPORTS
/////////////////////////////
import Cart from "../dao/mongo/carts/models/Cart.js";
import Product from "../dao/mongo/products/models/Products.js";
import mongoose from "mongoose";

import { cartsService } from "../service/index.js";

class CartMongoController {
	constructor() {
		this.cartsService = cartsService
	}

	/////////////////////////////
	// GET /api/carts
	/////////////////////////////
	getCarts = async (req, res, next) => {
		try {
			const carts = await this.cartsService.getCarts()

			res.status(200).json({
				status: 200,
				success: true,
				products: carts[0].products,
				total: carts[0].sum,
			});
		} catch (error) {
			next(error);
		}
	};

	/////////////////////////////
	// GET /api/carts/:cid
	/////////////////////////////
	getCartById = async (req, res, next) => {
		try {
			let cid = parseInt(req.params.cid);

			let cart = await this.cartsService.getCart({ _id: cid });

			res.json({
				status: 200,
				success: true,
				cart,
			});
		} catch (error) {
			next(error);
		}
	};
	/////////////////////////////
	// POST /api/carts
	/////////////////////////////
	createCart = async (req, res, next) => {
		try {
			const cart = await this.cartsService.create(req.body);

			res.json({
				status: 200,
				success: true,
				cart,
			});
		} catch (error) {
			next(error);
		}
	};

	/////////////////////////////
	// PUT /api/carts/:cid/product/:pid/:units
	/////////////////////////////
	updateCart = async (req, res, next) => {
		try {
			const cid = req.params.cid;
			const pid = req.params.pid;
			const dataToUpdate = req.params.units;

			const { cart, product } = await this.cartsService.updateCart(cid, pid, dataToUpdate)

			return res.status(200).json({
				status: 200,
				success: true,
				cart,
				stock: `There are ${product.stock} units available`,
			});
		} catch (error) {
			next(error);
		}
	};

	/////////////////////////////
	// GET /api/carts/bills/cid
	/////////////////////////////
	getBillCart = async (req, res, next) => {
		try {
			const carts = await Cart.aggregate([
				{ $match: { _id: new mongoose.Types.ObjectId(req.params.cid) } },
				{ $unwind: "$products" },
				{
					$lookup: {
						from: "products",
						localField: "products.product_id",
						foreignField: "_id",
						as: "product",
					},
				},
				{ $unwind: "$product" },
				{
					$set: {
						total: { $multiply: ["$products.quantity", "$product.price"] },
					},
				},
				{
					$group: {
						_id: "$_id",
						sum: { $sum: "$total" },
					},
				},
				{
					$project: {
						_id: 0,
						cart_id: "$_id",
						sum: 1,
					},
				},
			]);

			res.status(200).json({
				status: 200,
				success: true,
				message: "success",
				total: carts[0],
			});
		} catch (error) {
			next(error);
		}
	};

	/////////////////////////////
	// DELETE /api/carts/:cid/product/:pid/:units
	/////////////////////////////
	deleteProductsInCart = async (req, res, next) => {
		try {
			const cid = req.params.cid;
			const product_id = req.params.pid;
			// const product_quantity = req.params.units;

			let cart = await Cart.findById(cid);

			let product = await Product.findById(product_id);

			let product_cart = cart.products.find(
				(product) => product.product_id.toString() === product_id
			);

			const total_units = product_cart.quantity + product.stock;

			// UPDATE STOCK IN CART
			await Cart.updateOne(
				{ _id: cid },
				{ $pull: { products: { product_id: product_id } } }
			);
			// UPDATE STOCK IN PRODUCT
			product = await Product.findByIdAndUpdate(
				{ _id: product_id },
				{ stock: total_units },
				{ new: true }
			);

			res.json({
				status: 200,
				success: true,
				cart,
				stock: `There are ${product.stock} units in stock`,
			});
		} catch (error) {
			next(error);
		}
	};
}

export default CartMongoController