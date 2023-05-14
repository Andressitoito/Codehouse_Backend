import cart_manager from "../Manager/Cart_manager.js";

const send_navbar_data = async (req, res, next) => {
	const cart = await cart_manager.getCartById(1);

	const products_quantity = cart.products.reduce((acc, product) => {
		return (acc += product.quantity);
	}, 0);

	res.locals.products_quantity = products_quantity;

	next();
};

export default send_navbar_data;
