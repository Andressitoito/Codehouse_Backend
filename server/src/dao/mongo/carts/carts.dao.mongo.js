/////////////////////////////
// IMPORTS
/////////////////////////////
import Product from "../products/models/Products.js";
import Cart from "./models/Cart.js";
import mongoose from "mongoose";

class CartsDaoMongo {
	constructor() {
		this.Cart = Cart;
		this.Product = Product;
	}

	/////////////////////////////
	// GET /api/carts
	/////////////////////////////
	get = async (cid) => {
		return await this.Cart.aggregate([
			{
				$match: { _id: new mongoose.Types.ObjectId(cid) },
			},
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
					products: { $push: "$product" },
				},
			},
			{
				$project: {
					_id: 0,
					cart_id: "$_id",
					sum: 1,
					products: "$products",
				},
			},
		]);
	};

	/////////////////////////////
	// GET /api/carts/:cid
	/////////////////////////////
	getById = async (pid) => {
		return await this.Cart.findById({ _id: pid });
	};

	/////////////////////////////
	// POST /api/carts
	/////////////////////////////
	create = async (newProduct) => {
		return await this.Product.create(newProduct);
	};

	/////////////////////////////
	//PUT /api/carts/:cid/product/:pid/:units
	/////////////////////////////
	update = async (cid, pid, dataToUpdate) => {
		const product_id = pid;
		const product_quantity = dataToUpdate;

		if (product_quantity <= 0) {
			const error = new Error(`Invalid product_quantity: ${product_quantity}`);
			error.status = 422;
			throw error;
		}

		let cart = await Cart.findById(cid);

		let product = await Product.findById(product_id);

		let product_cart = cart.products.find(
			(product) => product.product_id.toString() === product_id
		);

		// if (product_quantity > product.stock) {
		// 	const error = new Error(`There are only ${product.stock} items in cart`);
		// 	error.status = 422;
		// 	throw error;
		// }

		if (!product_cart) {
			// const actual_stock = product.stock - product_quantity;

			// product = await Product.findByIdAndUpdate(
			// 	{ _id: product_id },
			// 	{ stock: actual_stock },
			// 	{ new: true }
			// );

			cart.products.push({ product_id: product._id, quantity: product_quantity });

			cart.save();
		} else {
			// const total_units = product_cart.quantity + product.stock;

			// const actual_stock = total_units - product_quantity;

			// product = await Product.findByIdAndUpdate(
			// 	{ _id: product_id },
			// 	{ stock: actual_stock },
			// 	{ new: true }
			// );

			product_cart.quantity = product_quantity;

			cart.save();
		}

		return { cart, product };
	};

	/////////////////////////////
	// GET /api/carts/bills/cid
	/////////////////////////////
	getBill = async (cid) => {
		return await this.Cart.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(cid) } },
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
	};

	/////////////////////////////
	// DELETE /api/carts/:cid/product/:pid/:units
	/////////////////////////////
	delete = async (cid, pid) => {
		const product_id = pid;
		// const product_quantity = req.params.units;

		let cart = await Cart.findById(cid);

		// let product_cart = cart.products.find(
		// 	(product) => product.product_id.toString() === product_id
		// );

		// const total_units = product_cart.quantity + product.stock;

		// UPDATE STOCK IN CART
		await Cart.updateOne(
			{ _id: cid },
			{ $pull: { products: { product_id: product_id } } }
		);
		// UPDATE STOCK IN PRODUCT
		// product = await Product.findByIdAndUpdate(
		// 	{ _id: product_id },
		// 	{ stock: total_units },
		// 	{ new: true }
		// );

		return { cart };
	};

	/////////////////////////////
	// PUT /api/carts/:cid/purchase
	/////////////////////////////
	purchase = async (cid) => {
		let amount = 0;
		let cart = await Cart.find({ _id: cid });

		cart = cart[0];

		const productIds = cart.products.map((product) => product.product_id);

		async function checkStock(productId) {
			try {
				let product = await Product.findOne({ _id: productId });

				if (!product) {
					return;
				}

				let product_cart = cart.products.find(
					(product) => product.product_id === productId
				);

				if (product_cart.quantity <= product.stock) {
					// 	UPDATE AMOUNT
					amount += product.price * product_cart.quantity;
					// UPDATE STOCK IN CART
					await Cart.updateOne(
						{ _id: cid },
						{ $pull: { products: { product_id: productId } } }
					);
					// UPDATE STOCK IN PRODUCT
					const total_units = product.stock - product_cart.quantity;
					product = await Product.findByIdAndUpdate(
						{ _id: productId },
						{ stock: total_units },
						{ new: true }
					);
				}
			} catch (error) {
				throw error;
			}
		}

		console.log("list of product ids", productIds);

		async function processProducts() {
			try {
				for (const productId of productIds) {
					await checkStock(productId);
				}

				console.log("all producst has been processed");
			} catch (error) {
				throw error;
			}
		}

		try {
			await processProducts();
		} catch (error) {
			throw error;
		}
		return amount;
	};
}

export default CartsDaoMongo;

// update = async (cid, pid, dataToUpdate) => {
// 	const product_id = pid;
// 	const product_quantity = dataToUpdate;

// 	if (product_quantity <= 0) {
// 		const error = new Error(`Invalid product_quantity: ${product_quantity}`);
// 		error.status = 422;
// 		throw error;
// 	}

// 	let cart = await Cart.findById(cid);

// 	let product = await Product.findById(product_id);

// 	let product_cart = cart.products.find(
// 		(product) => product.product_id.toString() === product_id
// 	);

// 	if (product_quantity > product.stock) {
// 		const error = new Error(`There are only ${product.stock} items in cart`);
// 		error.status = 422;
// 		throw error;
// 	}

// 	if (!product_cart) {
// 		const actual_stock = product.stock - product_quantity;

// 		product = await Product.findByIdAndUpdate(
// 			{ _id: product_id },
// 			{ stock: actual_stock },
// 			{ new: true }
// 		);

// 		cart.products.push({ product_id: product._id, quantity: product_quantity });

// 		cart.save();
// 	} else {
// 		const total_units = product_cart.quantity + product.stock;

// 		const actual_stock = total_units - product_quantity;

// 		product = await Product.findByIdAndUpdate(
// 			{ _id: product_id },
// 			{ stock: actual_stock },
// 			{ new: true }
// 		);

// 		product_cart.quantity = product_quantity;

// 		cart.save();
// 	}

// 	return { cart, product };
// };
