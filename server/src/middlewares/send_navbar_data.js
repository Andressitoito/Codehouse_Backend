import cart_manager from "../dao/memory/Cart_manager.js";
import Cart from "../dao/mongo/carts/models/Cart.js";

const send_navbar_data = async (req, res, next) => {
	// FILE SISTEM CART DATA	
	const cart = await cart_manager.getCartById(1);
	const products_quantity = cart.products.reduce((acc, product) => {
		return (acc += product.quantity);
	}, 0);

	res.locals.products_quantity = products_quantity;

	// MONGO CART DATA
	const mongo_cart = await Cart.find({ _id: '648276ab74476c69be6576b3' })

	const quantity = mongo_cart[0].products.reduce((acc, product) => {
		return acc+= product.quantity
	}, 0)

	res.locals.mongo_products_quantity = quantity;

	next();
};

export default send_navbar_data;
