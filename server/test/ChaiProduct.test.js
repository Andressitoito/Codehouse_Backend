import mongoose from "mongoose";
import Products from "../src/dao/mongo/products/products.dao.mongo.js";
import Assert from "assert";

mongoose.connect(process.env.MONGO_LINK);

const expect = chai.expect;

describe("Testing Product Dao", () => {
	before(function () {
		this.productsMongoDao = new Products();
	});

	beforeEach(function () {
		this.timeout(2000);
	});

	it("Our dao must get all products", async function () {
		const result = await this.productsMongoDao.get();

		// expect(result).to.be.deep.equal([])

		expect(Array.isArray(result)).to.be.ok;
	});
});
