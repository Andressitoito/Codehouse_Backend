import { faker } from "@faker-js/faker";

function generateProducts() {
	return {
		title: faker.commerce.productName(),
		price: faker.commerce.price(),
		department: faker.commerce.department(),
		stock: parseInt(faker.string.numeric()),
		description: faker.commerce.productDescription(),
		id: faker.database.mongodbObjectId(),
		image: faker.image.url(),
	};
}

export default function generateUserFaker() {
	let numOfProducts = parseInt(faker.string.numeric(1, { bannedDigits: ["0"] }));

	let products = [];

	for (let i = 0; i < numOfProducts; i++) {
		products.push(generateProducts());
	}

 return {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  gender: faker.person.sex(),
  birthDate: faker.date.birthdate(),
  phone: faker.phone.number(),
  image: faker.image.avatar(),
  id: faker.database.mongodbObjectId(),
  products: products
 }
}
