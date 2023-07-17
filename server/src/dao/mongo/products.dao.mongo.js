/////////////////////////////
// IMPORTS
/////////////////////////////
import Product from "./models/Products.js";

class ProductsDaoMongo {
	constructor() {
		this.Product = Product;
	}

	/////////////////////////////
	// GET /api/products
	/////////////////////////////
	getProducts = async (limit = 5, page = 1) => {
		return await this.Product.paginate({}, { limit, page, lean: true });
	};
	/////////////////////////////
	// GET /api/products/:pid
	/////////////////////////////
	getProductsById = async (pid) => {
		return await this.Product.findById({ _id: pid });
	};

	/////////////////////////////
	// POST /api/products
	/////////////////////////////
	createNewProduct = async (newProduct) => {
		return await this.Product.create(newProduct);
	};

	/////////////////////////////
	// PUT /api/products/:pid
	/////////////////////////////
	updateProduct = async (pid, dataToUpdate) => {
		return await this.Product.findByIdAndUpdate(pid, dataToUpdate, {
			new: true,
		});
	};

	/////////////////////////////
	// DELETE /api/products/:pid
	/////////////////////////////
	deleteProduct = async (pid) => {
		return await this.Product.findByIdAndDelete(pid);
	};
}

export default ProductsDaoMongo;
