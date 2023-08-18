class ProductMongoRepository {
	constructor(dao) {
		this.dao = dao;
	}

	get = async () => {
		let result = await this.dao.get();

		return result;
	};
	getById = async (pid) => {
		let result = await this.dao.getById(pid);

		return result;
	};
	create = async (newProduct) => {
		let result = await this.dao.create(newProduct);

		return result;
	};
	update = async (pid, objectToUpdate) => {
		let result = await this.dao.update(pid, objectToUpdate);

		return result;
	};
	delete = async (pid) => {
		let result = await this.dao.delete(pid);

		return result;
	};
}

export default ProductMongoRepository;
