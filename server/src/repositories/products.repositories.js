class ProductRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getProducts = async() => {
  let result = await this.dao.get()

  return result
 };
	getProduct = async(pid) => {
  let result = await this.dao.getById()

  return result
 };
	createProduct = async() => {

  // "user case dto userDTO comes here"

   
  let result = await this.dao.create()

  return result
 };
	updateProduct = async(pid, objectToUpdate) => {
  let result = await this.dao.update()

  return result
 };
	deleteProduct = async() => {
  let result = await this.dao.delete()

  return result
 };
}

module.exports = {
	ProductRepository,
};
