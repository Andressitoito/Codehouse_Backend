class CartMongoRepository {
 constructor(dao) {
  this.dao = dao;
 }

 getCarts = async (cid) => {
  let result = await this.dao.get(cid);

  return result;
 };
 getCart = async (pid) => {
  let result = await this.dao.getById(pid);

  return result;
 };
 createCart = async (newProduct) => {
  let result = await this.dao.create(newProduct);

  return result;
 };
 updateCart = async (cid, pid, objectToUpdate) => {
  let result = await this.dao.update(cid, pid, objectToUpdate);

  return result;
 };

 getBill = async (cid) => {
  let result = await this.dao.getBill(cid);

  return result;
 };

 delete = async (cid, pid) => {
  let result = await this.dao.delete(cid, pid);

  return result;
 };
}

export default CartMongoRepository