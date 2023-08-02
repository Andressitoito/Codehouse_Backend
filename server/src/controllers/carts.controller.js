/////////////////////////////
// IMPORTS
/////////////////////////////
import { response } from "express";
import { cartsService } from "../service/index.js";

class CartController {
	constructor() {
		this.cartsService = cartsService;
	}

	/////////////////////////////
	// GET /api/carts
	/////////////////////////////
	getCarts = async (req, res, next) => {
		try {
			console.log('enter here')
			const carts = await this.cartsService.getCarts();

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

			const { cart, product } = await this.cartsService.updateCart(
				cid,
				pid,
				dataToUpdate
			);

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
			const cid = req.params.cid;
			const carts = await this.cartsService.getBill(cid);

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
			const pid = req.params.pid;

			const { cart, product } = await this.cartsService.delete(cid, pid);

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

export default CartController;

