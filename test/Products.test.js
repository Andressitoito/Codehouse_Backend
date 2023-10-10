import mongoose from "mongoose";
import Products from "../src/dao/mongo/products/products.dao.mongo.js";
import Assert from "assert";

mongoose.connect(process.env.MONGO_LINK);

const assert = Assert.strict;

describe("Testing Product Dao", () => {
 before(function () {
  this.productsMongoDao = new Products();
 });
 beforeEach(function () {
  this.timeout(2000);
 });
 
 it('Our dao must get all products', async function () {
  const result = await this.productsMongoDao.get()

  assert.stricEqual(Array.isArray(result), true)

  console.log(result)
 })
 it('The dao must add a new product in the database', async function () {
  let mockProduct = {
   title: 'Test product',
   description: 'Product test',
   stock: 777,
   thumbnail: 'test@test.com',
   price: 777
  }
  const result = await this.productsDaoMongo.save(mockProduct)

  assert.ok(result._id)

 })
 it('The dao must add an empty array with []', async function () {
  let mockProduct = {
   title: 'Test product',
   description: 'Product test',
   stock: 777,
   thumbnail: 'test@test.com',
   price: 777
  }
  const result = await this.productsDaoMongo.save(mockProduct)

  assert.deepStrictEqual(result.products, [])

 })
 it('The dao can get an user by email', async function () {
  let mockProduct = {
   title: 'Test product',
   description: 'Product test',
   stock: 777,
   thumbnail: 'test@test.com',
   price: 777
  }
  const result = await this.productsDaoMongo.save(mockProduct)

  const testProduct = await this.productsDaoMongo.getBy({email: result.email})

  assert.strictEqual(typeof testProduct, 'object')
 })
});
