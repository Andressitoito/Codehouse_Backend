import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

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

const Ticket = model(collection, schema);

export default Ticket;
