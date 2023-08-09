import { faker } from "@faker-js/faker";

export default function generateProductFaker() {
 const stock = parseInt(faker.string.numeric(1, { bannedDigits: ["0"] })) || 1;

 return {
   title: faker.commerce.productName(),
   description: faker.commerce.productDescription(),
   stock: stock,
   thumbnail: faker.image.url(),
   price: faker.commerce.price(),
   id: faker.database.mongodbObjectId(),
 };
}
