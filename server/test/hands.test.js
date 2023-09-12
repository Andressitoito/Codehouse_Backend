import mongoose from "mongoose";
import Products from "../src/dao/mongo/products/products.dao.mongo.js";
import Assert from "assert";
import chai from "chai";
import create_hash from "../src/middlewares/create_hash.js";
import password_is_ok from "../src/middlewares/password_is_ok.js";
import { createHash } from "crypto";

const expect = char.expect;

describe("Bcrypt testing", () => {
	it("The service must return an efective password hash", async function () {
		const password = "pass123";
		const hashedPassword = await createHash(password);

		console.log(hashedPassword).to.not.equal(password);

		expect(hashedPassword);
	});

	it("The service must return an efective password hash", async function () {
		const password = "pass123";
		const hashedPass = await createHash(password);

		const userDbMock = {
			password: hashedPassword,
		};

		const isValidPassword = await password_is_ok(userDbMock, password);

		expect(isValidPassword).to.be.true;
	});
});

describe("Dto testing", () => {
	it("The service must return an user with unified fileds", async function () {
		let userMock = {
			first_name: "Andy",
			last_name: "Groso",
			email: "Andy@groso.com",
			password: "pass123",
		};

		const userDtoResult = UsrDTO.getu;

		expect(userDtoResult).to.have.property(
			"name",
			`${userMock.first_name} ${userMock.last_name} `
		);
  expect(userDtoResult).to.not.have.property('first_name')
  expect(userDtoResult).to.not.have.property('last_name')
  expect(userDtoResult).to.not.have.property('password')


	});
});
