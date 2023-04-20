/*
/////////////////////////////
// MANEJO DE ARCHIVOS
/////////////////////////////
Consigna

- Modificar la clase ProductManager para que gestione un conjunto de productos de un archivo. Empezar a construir la base de datos (en un archivo)

- La clase debe recibir como parámetro la ruta donde se creará el archivo y el constructor debe incluir esta ruta en la variable this.path

- Cada producto que gestione debe contar con las propiedades ya vistas en la tarea anterior.

- addProduct agrega un producto al arreglo de productos del archivo. Todos los campos son obligatorios menos:
> id que debe agregarse automáticamente y autoincrementable
> stock es opcional ya que si el usuario no lo envía debe ser cero
> En caso de éxito devolver el id del producto
> En caso de error devolver un mensaje que diga: “addProduct: error”

- getProducts debe devolver el arreglo con todos los productos guardados en el archivo.
> En caso de que no haya productos devolver: “Not found”
> En caso de error devolver un mensaje que diga: “getProducts: error”

- getProductById(id) debe recibir como parámetro el id del producto y debe devolver un objeto con todas las propiedades del producto.
> En caso de no coincidir devolver: “Not found”
> En caso de error devolver un mensaje que diga: “getProductById: error”

- updateProduct(id,data) debe recibir un id y un objeto data con las propiedades a modificar del producto.
> En caso de no coincidir devolver: “Not found”
> En caso de éxito devolver un mensaje que diga:  “updateProduct: done”
> En caso de error devolver un mensaje que diga: “updateProduct: error”

- deleteProduct(id)debe recibir como parámetro el id del producto y debe borrar el producto del archivo.
> En caso de no coincidir devolver: “Not found”
> En caso de éxito devolver un mensaje que diga:  “deleteProduct: done”
> En caso de error devolver un mensaje que diga: “deleteProduct: error”
*/

const fs = require("fs");

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
				console.log("There was a problem creating a file");
			}
		} else {
			try {
				const data = fs.readFileSync(path, "utf-8");
				this.products = JSON.parse(data);

    console.log('this.products INIT ', this.products)
			} catch (err) {
				console.log("There was a problem reading the file");
			}
		}
	}

	addProduct() {
		try {
			const new_product = {
				product: "Product",
			};
			console.log("this.products ", this.products);
			this.products.push(new_product);
			console.log("products ", this.products);
			let products = this.products;

			fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
		} catch (err) {
			console.log("There was a problem creating a new product");
			console.log(err);
		}
	}
}

let product_manager = new ProductManager("./data/products.json");

product_manager.addProduct();

