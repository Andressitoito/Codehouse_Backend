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
	get = async (limit = 5, page = 1) => {
		return await this.Product.paginate({}, { limit, page, lean: true });
	};
	
	/////////////////////////////
	// GET /api/products/:pid
	/////////////////////////////
	getById = async (pid) => {
		return await this.Product.findById({ _id: pid });
	};

	/////////////////////////////
	// POST /api/products
	/////////////////////////////
	create = async (newProduct) => {
		return await this.Product.create(newProduct);
	};

	/////////////////////////////
	// PUT /api/products/:pid
	/////////////////////////////
	update = async (pid, dataToUpdate) => {
		return await this.Product.findByIdAndUpdate(pid, dataToUpdate, {
			new: true,
		});
	};

	/////////////////////////////
	// DELETE /api/products/:pid
	/////////////////////////////
	delete = async (pid) => {
		return await this.Product.findByIdAndDelete(pid);
	};
}

export default ProductsDaoMongo;
