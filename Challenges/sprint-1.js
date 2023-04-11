/* 

/////////////////////////////
// Clases con ECMAScript y ECMAScript avanzado
/////////////////////////////
Consigna

- Realizar una clase “ProductManager” que gestione un conjunto de productos.

- Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
> Cada producto que gestione debe contar con las propiedades:
> title (nombre del producto)
> description (descripción del producto)
> price (precio)
> thumbnail (ruta de imagen)
> id (código identificador)
> stock (número de piezas disponibles)

- Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
> Todos los campos son obligatorios menos id que debe agregarse automáticamente  y auto- incrementable

- Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

- Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
> En caso de no coincidir ningún id, mostrar en consola un error “Not found”

*/

class ProductManager {
	constructor() {
		this.products = [];
	}

	addProduct({ title, description, price, thumbnail, stock }) {
		let index = this.products.findIndex((product) => product.title === title);
		console.log("index ", index);

		if (index !== -1) {
			return console.log(
				`This product "${title}" is already on the list at index ${index}`
			);
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
			stock,
		};

		this.products.push(new_product);
	}

	getProducts() {
		console.log(this.products);
	}

	deleteProductById(product_id) {
		const index = this.products.findIndex((product) => product.id === product_id);

		if (index === -1) {
			return console.log(`This product_id "${product_id}" is inexistent`);
		}

		const products = this.products.filter((product) => product.id !== product_id);
		this.products = products;
		console.log(`This product_id "${product_id}" was successfully removed`)

		return products;
	}

	getProductById(product_id) {
		const product = this.products.find((product) => product.id === product_id);

		if (product) {
			console.log(product);
			return product;
		} else {
			throw new Error(`Product id:${product_id} was not found`);
		}
	}

	de;
}

let product = new ProductManager();
/////////////////////////////
// GET PRODUCTS
console.log("GET PRODUCTS");
product.getProducts();
/////////////////////////////
// ADD PRODUCTS
product.addProduct({
	title: "Shirts",
	description: "Very good shirts",
	price: 23,
	thumbnail: "http//shirts.com",
	stock: 3,
});
product.addProduct({
	title: "Jeans",
	description: "Very good Jeans",
	price: 43,
	thumbnail: "http//Jeans.com",
	stock: 5,
});
product.addProduct({
	title: "Shoes",
	description: "Very good Shoes",
	price: 53,
	thumbnail: "http//shoes.com",
	stock: 2,
});
/////////////////////////////
// ADD REPEATED PRODUCT
console.log("ADD REPEATED PRODUCT");
product.addProduct({
	title: "Jeans",
	description: "Very good Jeans",
	price: 43,
	thumbnail: "http//Jeans.com",
	stock: 5,
});
/////////////////////////////
// GET PRODUCTS
console.log("GET PRODUCTS");
product.getProducts();
/////////////////////////////
// GET PRODUCT BY ID
console.log("GET PRODUCT BY ID");
product.getProductById(2);
/////////////////////////////
// DELETE PRODUCT BY ID
console.log("DELETE PRODUCT BY ID");
product.deleteProductById(3);
product.getProducts()
console.log("DELETE PRODUCT BY INEXISTENT ID");
product.deleteProductById(31);
/////////////////////////////
// GET PRODUCT BY ID ERROR
console.log("GET PRODUCT BY INEXISTENT ID");
product.getProductById(21);
