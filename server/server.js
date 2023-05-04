/////////////////////////////
// IMPORTS
/////////////////////////////
import express from "express";
import product_manager from "./product_manager.js";
import cart_manager from "./cart_manager.js";
/////////////////////////////
// SERVER UP
/////////////////////////////
let server = express();
let PORT = 8080;
let ready = () => {
 console.log(`Server ready on port ${PORT}`);
};

server.listen(PORT, ready);
/////////////////////////////
// MIDDLEWARES
/////////////////////////////
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/////////////////////////////
// GET /api/products
/////////////////////////////
let api_products = "/api/products";

server.get(api_products, async (req, res) => {
	try {
		let query = parseInt(req.query.limit);

		let products = await product_manager.getProducts(query);
		res.send({
			status: 200,
			success: true,
			message: `There are ${products.length} products`,
			products,
		});
	} catch (error) {
		res.send({
			status: 500,
			success: false,
			message: error.toString(),
		});
	}
});

/////////////////////////////
// GET /api/products/:pid
/////////////////////////////
let api_products_id = "/api/products/:pid";

server.get(api_products_id, async (req, res) => {
	try {
		let id = parseInt(req.params.pid);
		let product = await product_manager.getProductById(id);

		res.send({
			status: 200,
			success: true,
			product,
		});
	} catch (error) {
		res.send({
			status: 500,
			success: false,
			message: error.toString(),
		});
	}
});

/////////////////////////////
// GET /api/carts
/////////////////////////////
let api_carts = "/api/carts";

server.get(api_carts, async (req, res) => {
	try {
		let carts = await cart_manager.getCarts();

		console.log(carts);
		res.send({
			status: 200,
			success: true,
			carts,
		});
	} catch (error) {
		res.send({
			status: 500,
			success: false,
			message: error.toString(),
		});
	}
});

/////////////////////////////
// GET /api/carts/:cid
/////////////////////////////
let api_cart_by_id = "/api/carts/:cid";

server.get(api_cart_by_id, async (req, res) => {
	try {
		let cid = parseInt(req.params.cid);

		let cart = await cart_manager.getCartById(cid);

		res.send({
			status: 200,
			success: true,
			cart,
		});
	} catch (error) {
		res.send({
			status: 500,
			success: false,
			message: error.toString(),
		});
	}
});
