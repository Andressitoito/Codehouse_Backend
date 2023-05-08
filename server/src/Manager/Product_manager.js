/*
/////////////////////////////
// MANEJO DE ARCHIVOS
/////////////////////////////
- Modificar la clase ProductManager para que gestione un conjunto de productos de un archivo. Empezar a construir la base de datos (en un archivo)

- La clase debe recibir como parámetro la ruta donde se creará el archivo y el constructor debe incluir esta ruta en la variable this.path. Cada producto que gestione debe contar con las propiedades ya vistas en la tarea anterior.
*/
import fs from "fs";

class ProductManager {
	constructor(path) {
		this.products = [];
		this.path = path;
		this.init(path);
	}

	init(path) {
		let file = fs.existsSync(path);

		if (!file) {
			try {
				fs.writeFileSync(path, "[]");
			} catch (err) {
				throw "There was a problem creating a file";
			}
		} else {
			try {
				const data = fs.readFileSync(path, "utf-8");
				this.products = JSON.parse(data);
			} catch (err) {
				throw "There was a problem reading the file";
			}
		}
	}

	async addProduct({ title, description, price, thumbnail, stock }) {
		// - addProduct agrega un producto al arreglo de productos del archivo.
		// Todos los campos son obligatorios menos:
		// > id que debe agregarse automáticamente y autoincrementable
		// > stock es opcional ya que si el usuario no lo envía debe ser cero
		// > En caso de éxito devolver el id del producto
		// > En caso de error devolver un mensaje que diga: “addProduct: error”
		try {
			let repeatedIndex = this.products.findIndex(
				(product) => product.title === title
			);

			if (repeatedIndex !== -1) {
				throw `This product '${title}' already exists at index ${repeatedIndex}`;
			}

			let id;

			if (this.products.length === 0) {
				id = 1;
			} else {
				let lastProduct = this.products[this.products.length - 1];
				id = lastProduct.id + 1;
			}

			const new_product = {
				id,
				title,
				description,
				price,
				thumbnail,
				stock: stock ?? 10,
			};

			this.products.push(new_product);

			await fs.promises.writeFile(
				this.path,
				JSON.stringify(this.products, null, 2)
			);

			return new_product;
		} catch (error) {
			throw `addProduct: ${error}`;
		}
	}

	async getProducts(quantity) {
		// getProducts debe devolver el arreglo con todos los productos guardados en el archivo y en caso de que no haya productos devolver: “Not found”
		// En caso de error devolver un mensaje que diga: “getProducts: error”
		try {
			if (this.products.length === 0) {
				throw "Not found";
			}
			return quantity ? this.products.slice(0, quantity) : this.products;
		} catch (error) {
			throw "getProducts: error";
		}
	}

	async getProductById(id) {
		// - getProductById(id) debe recibir como parámetro el id del producto y debe devolver un objeto con todas las propiedades del producto.
		// > En caso de no coincidir devolver: “Not found”
		// > En caso de error devolver un mensaje que diga: “getProductById: error”
		try {
			const product = this.products.find((product) => product.id === id);

			if (product) {
				return product;
			} else {
				throw "Product not found";
			}
		} catch (error) {
			throw `getProductById: ${error}`;
		}
	}

	async updateProduct(id, data) {
		// - updateProduct(id,data) debe recibir un id y un objeto data con las propiedades a modificar del producto.
		// > En caso de no coincidir devolver: “Not found”
		// > En caso de éxito devolver un mensaje que diga:  “updateProduct: done”
		// > En caso de error devolver un mensaje que diga: “updateProduct: error”
		try {
			let product = await this.getProductById(id);

			if (Object.keys(data).length === 0) {
				throw "No data to update";
			}

			const validProps = ["title", "description", "price", "thumbnail", "stock"];
			for (const prop in data) {
				if (!validProps.includes(prop)) {
					throw `wrong data sent '${prop}`;
				}
				product[prop] = data[prop];
			}

			await fs.promises.writeFile(
				this.path,
				JSON.stringify(this.products, null, 2)
			);
			return product;
		} catch (error) {
			throw `updateProduct: ${error}`;
		}
	}

	async deleteProduct(id) {
		// - deleteProduct(id)debe recibir como parámetro el id del producto y debe borrar el producto del archivo.
		// > En caso de no coincidir devolver: “Not found”
		// > En caso de éxito devolver un mensaje que diga:  “deleteProduct: done”
		// > En caso de error devolver un mensaje que diga: “deleteProduct: error”
		try {
			let product = await this.getProductById(id);

			this.products = this.products.filter((product) => product.id !== id);

			await fs.promises.writeFile(
				this.path,
				JSON.stringify(this.products, null, 2)
			);
			return `deleteProduct: product id:${product.id} deleted`;
		} catch (error) {
			throw `deleteProduct: ${error}`;
		}
	}
}

/////////////////////////////
// DEFINE ProductManager INSTANCE
let product_manager = new ProductManager("./data/products.json");

export default product_manager;

/////////////////////////////
// ADD PRODUCTS
// console.log("PRODUCTS ADDED TO products.json FILE");
// product_manager.addProduct({
// 	title: "Echeveria Succulent",
// 	description:
// 		"Beautiful pink and green rosette-shaped succulent. Easy to care for and perfect for any indoor or outdoor space.",
// 	price: 15,
// 	thumbnail: "https://example.com/echeveria.jpg",
// 	stock: 8,
// });

// product_manager.addProduct({
// 	title: "Snake Plant",
// 	description:
// 		"Stylish and low-maintenance, the snake plant is perfect for any home. Its long, upright leaves add a modern touch to any room.",
// 	price: 20,
// 	thumbnail: "https://example.com/snake_plant.jpg",
// 	stock: 10,
// });

// product_manager.addProduct({
// 	title: "ZZ Plant",
// 	description:
// 		"The ZZ plant is a low-light champion, making it perfect for offices and homes alike. Its glossy leaves add a touch of sophistication to any space.",
// 	price: 18,
// 	thumbnail: "https://example.com/zz_plant.jpg",
// 	stock: 5,
// });

// product_manager.addProduct({
// 	title: "Mint Herb Plant",
// 	description:
// 		"Fresh and fragrant, this herb is perfect for adding to drinks, desserts, or as a garnish. Easy to grow and perfect for any kitchen.",
// 	price: 12,
// 	thumbnail: "https://example.com/mint_plant.jpg",
// });

// product_manager.addProduct({
// 	title: "Fiddle Leaf Fig",
// 	description:
// 		"A popular indoor tree with large, violin-shaped leaves. Its dramatic silhouette adds a touch of elegance to any room.",
// 	price: 45,
// 	thumbnail: "https://example.com/fiddle_leaf_fig.jpg",
// 	stock: 2,
// });

// product_manager.addProduct({
// 	title: "Aloe Vera Plant",
// 	description:
// 		"This succulent is not only easy to care for, but its gel can also soothe burns and other skin irritations. A must-have for any home.",
// 	price: 17,
// 	thumbnail: "https://example.com/aloe_vera.jpg",
// 	stock: 6,
// });

// product_manager.addProduct({
// 	title: "Lavender Plant",
// 	description:
// 		"Known for its calming aroma, lavender is a versatile herb that can be used in cooking or for aromatherapy. Easy to care for and beautiful to look at.",
// 	price: 14,
// 	thumbnail: "https://example.com/lavender_plant.jpg",
// });

// product_manager.addProduct({
// 	title: "Spider Plant",
// 	description:
// 		"One of the easiest plants to care for, the spider plant is perfect for beginners. Its long, spindly leaves make it a great addition to any room.",
// 	price: 10,
// 	thumbnail: "https://example.com/spider_plant.jpg",
// 	stock: 7,
// });

// product_manager.addProduct({
// 	title: "String of Pearls",
// 	description:
// 		"This unique succulent has long, thin stems with tiny green 'pearls' that trail down. Perfect for hanging baskets or as a statement piece.",
// 	price: 22,
// 	thumbnail: "https://example.com/string_of_pearls.jpg",
// 	stock: 4,
// });

// product_manager.addProduct({
// 	title: "Basil Herb Plant",
// 	description:
// 		"A staple herb in many kitchens, basil is easy to grow and adds a fresh, aromatic flavor to any dish.",
// 	price: 9,
// 	thumbnail: "https://example.com/basil_plant.jpg",
// });

/////////////////////////////
// GET PRODUCT BY ID
// console.log("GET PRODUCT BY ID");
// product_manager.getProductById(1);

/////////////////////////////
// UPDATE PRODUCT
// console.log("UPDATE PRODUCT");
// product_manager.updateProduct(9, {});
// product_manager.updateProduct(9, {
//  "title": "Thread of Silofornias",
// "description": "This unique succulent has long, thin stems with tiny green 'pearls' that trail down. Perfect for hanging baskets or as a statement piece.",
// "price": 22,
// "thumbnail": "https://example.com/string_of_pearls.jpg",
// "stock": 4
// });

/////////////////////////////
// DELETE PRODUCT
// console.log("DELETE PRODUCT");
// product_manager.deleteProduct(10);

/////////////////////////////
// GET PRODUCTS
// console.log("GET PRODUCTS");
// Insert quantity, default 5
// product_manager.getProducts();
