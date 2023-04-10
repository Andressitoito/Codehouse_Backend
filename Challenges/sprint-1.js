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
		let repeated = this.products.some((product) => product.title === title);

		if (repeated) {
			return console.log("This product is already on the list");
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

	getProductById(product_id) {
		const product = this.products.find((product) => product.id === product_id);

		if (product) {
			console.log(product);
			return product;
		} else {
			return console.log("Not found");
		}
	}
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
// GET PRODUCT BY ID ERROR
console.log("GET PRODUCT BY INEXISTENT ID");
product.getProductById(21);