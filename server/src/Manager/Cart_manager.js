import fs from "fs";

class cartManager {
	constructor(path) {
		this.carts = [];
		this.path = path;
		this.init(path);
	}

	init(path) {
		let file = fs.existsSync(path);

		if (!file) {
			try {
				fs.writeFileSync(path, "[]");
			} catch (error) {
				throw "There was a problem creating cart manager file";
			}
		} else {
			try {
				let data = fs.readFileSync(this.path, "utf-8");
				this.carts = JSON.parse(data);
			} catch (error) {
				throw "There was a problem reading cart manager file";
			}
		}
	}

	async addCart() {
		// addCart agrega un carrito al arreglo de carritos del archivo. Cada carrito debe tener las siguientes propiedades:
		// id: que debe agregarse automáticamente  y autoincrementable
		// products: es un array vacío al que se le agregarán objetos las propiedades: pid(id del producto) y quantity(cantidad).
		// En caso de éxito devolver el id del carrito.
		// En caso de error devolver un mensaje que diga:  “addCart: error”
		try {
			let id = 0;

			if (this.carts.length === 0) {
				id = 1;
			} else {
				let lastCart = this.carts[this.carts.length - 1];
				id = lastCart.id + 1;
			}

			let cart = {
				id,
				products: [],
			};

			this.carts.push(cart);

			await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 1));

			return cart;
		} catch (error) {
			throw `addCart: ${error}`;
		}
	}

	async getCarts(quantity) {
		// getCarts debe devolver el arreglo con todos los carritos guardados en el archivo y en caso de que no haya carritos devolver: “Not found”
		// En caso de error devolver un mensaje que diga: “getCarts: error”
		try {
			if (this.carts.length === 0) {
				throw "Not found";
			}

			if (quantity) {
				return this.carts.slice(0, quantity);
			} else {
				return this.carts;
			}
		} catch (error) {
			throw `getCarts: ${error}`;
		}
	}

	async getCartById(cid) {
		// Debe recibir como parámetro el id del carrito y debe devolver un objeto con todas las propiedades del carrito y en caso de no coincidir devolver: “Not found”
		// En caso de error devolver un mensaje que diga: “getCartById: error”
		try {
			let cart = this.carts.find((cart) => cart.id === cid);
			if (cart) {
				return cart;
			} else {
				throw "Not found";
			}
		} catch (error) {
			throw `getCartById: ${error}`;
		}
	}

	async updateCart({ cid, product_data }) {
		try {
			const { pid, quantity } = product_data;
			const cart = await this.getCartById(cid);
			const product = cart.products.find((product) => product.pid === pid);

			const validProps = ["pid", "quantity"];
			for (const prop in product_data) {
				if (!validProps.includes(prop)) {
					throw `wrong data sent '${prop}`;
				}
			}

			if (product) {
				product.quantity = product.quantity + quantity;
			} else {
				const product_data = {
					pid,
					quantity,
				};
				cart.products.push(product_data);
			}

			fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 1));

			return cart;
		} catch (error) {
			throw `updateCart: ${error}`;
		}
	}

	async deleteCart(cid) {
		try {
			await this.getCartById(cid);

			const carts = this.carts.filter((cart) => cart.id !== cid);

			await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 1));
		} catch (error) {
			throw `deleteCart: ${error}`;
		}
	}

	async deleteProductCart({ cid, product_data }) {
		try {
			const { pid, quantity } = product_data;
			const cart = await this.getCartById(cid);
			const product = cart.products.find((product) => product.pid === pid);

			const validProps = ["pid", "quantity"];
			for (const prop in product_data) {
				if (!validProps.includes(prop)) {
					throw `wrong data sent '${prop}`;
				}
			}

			if (product) {
				console.log("entra aca");
				product.quantity = product.quantity - quantity;
			}

			await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 1));

			return cart;
		} catch (error) {
			throw `updateCart: ${error}`;
		}
	}
}

/////////////////////////////
// DEFINE cartManager INSTANCE
let cart_manager = new cartManager("./data/carts.json");

export default cart_manager;

/////////////////////////////
// ADD CARTS
// cart_manager.addCart({
// 	pid: 1,
// 	quantity: 5,
// });
// cart_manager.addCart({
// 	pid: 3,
// 	quantity: 2,
// });
// cart_manager.addCart({
// 	pid: 6,
// 	quantity: 1,
// });
// cart_manager.addCart({
// 	pid: 5,
// 	quantity: 7,
// });
// cart_manager.addCart({
// 	pid: 4,
// 	quantity: 2,
// });
