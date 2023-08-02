import { Schema, model, Types } from "mongoose";
import Cart from "../../carts/models/Cart.js";

const collection = "users";

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		default:
			"https://www.pngitem.com/pimgs/m/227-2271053_usuario-persona-genrico-solo-general-smbolo-user-clipart.png",
		required: true,
	},
	email: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	age: {
		type: Number,
	},
	role: {
		type: String,
		default: "USER",
	},
	password: {
		type: String,
		required: true,
	},
	cart_id: {
		type: Types.ObjectId,
		ref: "carts",
		index: true,
	},
});

schema.pre("save", async function (next) {
	try {
		// Create a new empty cart
		const newCart = new Cart();
		await newCart.save();

		// Set the cart_id to the user
		this.cart_id = newCart._id;
		next();
	} catch (error) {
		next(error);
	}
});

const User = model(collection, schema);

export default User;

