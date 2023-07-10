import { model, Schema, Types } from "mongoose";

let collection = "carts";

const schema = new Schema({
	products: [{
		product_id: {
			type: Types.ObjectId,
			required: true,
			ref: "products",
			index: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	}],
});

const Cart = model(collection, schema);

export default Cart;