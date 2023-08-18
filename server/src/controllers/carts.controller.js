/////////////////////////////
// IMPORTS
/////////////////////////////
import Ticket from "../dao/mongo/tickets/models/Tickets.js";
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

			const { cart } = await this.cartsService.delete(cid, pid);

			res.json({
				status: 200,
				success: true,
				cart,
				stock: `There are more units in stock`,
			});
		} catch (error) {
			next(error);
		}
	};

	/////////////////////////////
	// PUT /:cid/purchase
	/////////////////////////////
	purchase = async (req, res, next) => {
		try {
			// console.log(cart)

			console.log("req.user FROM PURCHASE CONTROLLER ", req.user);

			const cid = req.params.cid;
			console.log("cid form req.params", cid);

			console.log("	llegamos aca");

			const amount = await this.cartsService.purchase(cid);
			console.log(amount);

			if (amount !== 0) {
				const ticketData = {
					purchaser: req.user.email,
					amount,
				};
				const ticket = await Ticket.create(ticketData);
				console.log(ticket);
			}

			res.json({
				status: 200,
				success: true,
				message: `The cart was updated and the ticket generated`,
				amount,
			});
		} catch (error) {
			next(error);
		}
	};
}

export default CartController;

// "648276ab74476c69be6576b3"
