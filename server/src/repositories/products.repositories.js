class ProductMongoRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getProducts = async () => {
		let result = await this.dao.get();

		return result;
	};
	getProduct = async (pid) => {
		let result = await this.dao.getById(pid);

		return result;
	};
	createProduct = async (newProduct) => {
		// "user case dto userDTO comes here"

		let result = await this.dao.create(newProduct);

		return result;
	};
	updateProduct = async (pid, objectToUpdate) => {
		let result = await this.dao.update(pid, objectToUpdate);

		return result;
	};
	deleteProduct = async (pid) => {
		let result = await this.dao.delete(pid);

		return result;
	};
}

export default ProductMongoRepository
