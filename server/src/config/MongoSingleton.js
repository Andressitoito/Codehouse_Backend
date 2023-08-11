import mongoose from "mongoose";
import { logger } from "./logger.js";

class MongoSingleton {
	static #instance;

	constructor() {
		mongoose.connect(process.env.MONGO_LINK, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	static getInstance() {
		if (this.#instance) {
			console.log("Already connected");
			this.#instance;
			return;
		}
		this.#instance = new MongoSingleton();
		logger.info("Connected");
		return this.#instance;
	}
}

export default MongoSingleton;
