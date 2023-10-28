import Cart from "../dao/mongo/carts/models/Cart.js";

const send_navbar_data = async (req, res, next) => {
	if (req.user === undefined) {
		res.locals.mongo_products_quantity = 0;
	} else {
		const cart_id = req.user.cart_id;
		const mongo_cart = await Cart.find({ _id: cart_id });

		const quantity = mongo_cart[0].products.reduce((acc, product) => {
			return (acc += product.quantity);
		}, 0);

		res.locals.mongo_products_quantity = quantity;
	}

	next();
};

export default send_navbar_data;
