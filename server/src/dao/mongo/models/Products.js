import { model, Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = "products";

const schema = new Schema({
	title: {
		type: String,
		required: true,
		index: true
	},
	description: {
		type: String,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	thumbnail: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

schema.plugin(mongoosePaginate)

const Product = model(collection, schema);

export default Product;
