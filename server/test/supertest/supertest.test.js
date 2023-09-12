import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing GreenShop", () => {
	it("This call must not retrive user data", async function () {
		this.timeout(5000);
		const { _body } = await requester.get("/api/current");

		expect(_body.status).to.equal(404);
	});

	it("Cart route must return all carts data", async function () {
		this.timeout(5000);
		const { _body } = await requester.get("/api/carts_mongo");

		expect(_body.status).to.equal(200);
		expect(_body.success).to.deep.equal(true);
		expect(Array.isArray(_body.carts)).to.be.ok;
	});

	it("Must return all carts data", async function () {
		this.timeout(5000);
		const { _body } = await requester.get("/api/carts_mongo");

		expect(_body.status).to.equal(200);
		expect(_body.success).to.deep.equal(true);
		expect(Array.isArray(_body.carts)).to.be.ok;
	});
});

// describe("Testing GreenShop", () => {
// 	it("Our dao must get all products", async function () {
// 		const productsDao = new ProductsDaoMongo();

// 		const result = await productsDao.get();

// 		expect(Array.isArray(result)).to.be.ok;
// 	});
// });

// it('The get endpoint /api/products_mongo must get an array of products', async function () {
//  const {statusCode, ok,body } =await requester.get('/api/products_mongo')

//  expect(ok).to.be.equal(true)
// })

// describe("Test avanzado de Session ");
// let cookie = null;
// it("The service must register an user", async function () {
//  const mockUser = {
//   first_name: "Andy",
//   last_name: "Groso",
//   email: "andy@groso.com",
//   password: "1234567",
//  };

//  const { _body } = await requester.post('/api/auth/register').send(mockUser)

//  expect(_body.payload).to.be.ok
// });

// it('The server must log an user and return a cookie', async function () {
//  const mockUser = {
//   email: "andy@groso.com",
//   password: "1234567",
//  };

//  const result = await requester.post('/api/sessins').send(mockUser)

//  const cookieResult = result.headers['set-cookie'][0]

//  console.log(result)
//  console.log('cookie Result: ', cookieResult)

//  expect(cookieResult).to.be.ok
//  cookie = {
//   name: cookieResult.split('=')[0],
//   value: cookieResult.split('=')[1]
//  }

//  expect(cookie.name).to.be.ok.and.eql('coderCookie')
//  expect(cookie.value).to.be.ok
// })

// it('The server must send a cookie that contains the user and destructure correctly', async function () {

//  const { _body } = await requester.get('/api/seessions/current').set('Cookie', [`${cookie, name}=${cookie.value}`])

//  console.log(body)

//  expect(_body.paload.email).to.be.eql('andy@groso.com')

// })

// it('The server must create a product with the route of the image', async function () {

//  const productMock = {
//   name: 'Product',
//   description: 'Plant',
//   price: 12
//  }

//  const result = await requester.post('api/pets/withimage')
//   .field('name', productMock.name)
//   .field('description', productMock.description)
//   .field('price', productMock.price)
//   .attach('image', '.test/coderProduct.jpg')

//  expect(result.statusCOde).to.be.eql(200)
//  expect(result._body.payload).to.have.property('_id')
//  expect(result._body.payload.image).to.be.ok
// })
