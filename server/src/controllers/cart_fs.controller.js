/////////////////////////////
// IMPORTS
/////////////////////////////
import product_manager from "../Manager/Product_manager.js";
import cart_manager from "../Manager/Cart_manager.js";

class CartFsController {
	constructor() {
		this.product_manager = product_manager;
		this.cart_manager = cart_manager;
	}

	/////////////////////////////
	// GET /api/carts
	/////////////////////////////
	getCartsFs = async (req, res, next) => {
		try {
			let carts = await cart_manager.getCarts();

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
	};
	/////////////////////////////
	// GET /api/carts/:cid
	/////////////////////////////
	getCartByIdFs = async (req, res, next) => {
		try {
			let cid = parseInt(req.params.cid);

			let cart = await cart_manager.getCartById(cid);

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
	createCartFs = async (req, res, next) => {
		try {
			let cart = await cart_manager.addCart();

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
	updateProductInCartByIdFs = async (req, res, next) => {
		try {
			const cid = Number(req.params.cid);
			const product_id = Number(req.params.pid);
			const product_quantity = Number(req.params.units);
			let product = await product_manager.getProductById(product_id);
			console.log("PRODUCT WITH CID  ", product);
			let cart = await cart_manager.getCartById(cid);

			if (product_quantity <= 0) {
				const error = new Error(`Invalid product_quantity: ${product_quantity}`);
				error.status = 422;
				throw error;
			}

			let product_in_cart = cart.products.find(
				(product) => product.pid === product_id
			);

			if (!product_in_cart) {
				// UPDATE STOCK IN CART FILE
				const product_data = {
					pid: product_id,
					quantity: product_quantity,
				};

				cart = await cart_manager.updateCart({ cid, product_data });
				console.log("cart ", cart);

				console.log("BEFORE  ", product);

				// UPDATE STOCK IN PRODUCT FILE
				product = await product_manager.updateProduct(product_id, {
					stock: product.stock - product_quantity,
				});

				console.log("after ", product);
			} else {
				let totalUnits = Number(product.stock) + Number(product_in_cart.quantity);
				if (product_quantity <= totalUnits) {
					// UPDATE STOCK IN CART FILE
					const product_data = {
						pid: product_id,
						quantity: product_quantity,
					};

					cart = await cart_manager.updateCart({ cid, product_data });

					// UPDATE STOCK IN PRODUCT FILE
					console.log("BEFORE  ", product);

					product = await product_manager.updateProduct(product_id, {
						stock: totalUnits - product_quantity,
					});

					console.log("AFTER  ", product);
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
	};

	/////////////////////////////
	// DELETE /api/carts/:cid/product/:pid/:units
	/////////////////////////////
	deleteProductInCartyIdFs = async (req, res, next) => {
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
	};
}

export default CartFsController