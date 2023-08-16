import { Schema, model } from "mongoose";

const { v4: uuidv4 } = require("uuid");

function generateTicketCode() {
	return uuidv4().toUpperCase().replace(/-/g, "");
}

const collection = "tickets";

const schema = new Schema({
	code: {
		type: String,
		required: true,
		unique: true,
		default: generateTicketCode(),
	},
	purchase_datetime: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	purchaser: {
		type: String,
	},
});

const User = model(collection, schema);

export default User;
