/////////////////////////////
// IMPORTS
/////////////////////////////
import product_manager from "./models/Product_manager.js";

class ProductsDaoMemory {
 constructor() {
  this.product_manager = product_manager;
 }

 /////////////////////////////
 // GET /api/products
 /////////////////////////////
 get = async (limit = 5) => {
  return await this.product_manager.getProducts(limit)
 };

 /////////////////////////////
 // GET /api/products/:pid
 /////////////////////////////
 getById = async (pid) => {
  return await this.product_manager.getProductById(pid);
 };

 /////////////////////////////
 // POST /api/products
 /////////////////////////////
 create = async (newProduct) => {
  return await this.product_manager.addProduct(newProduct);
 };

 /////////////////////////////
 // PUT /api/products/:pid
 /////////////////////////////
 update = async (idToUpdate, dataToUpdate) => {
   const products = await product_manager.getProducts();

   let productFinded = products.find((product) => product.id === idToUpdate);

   if (req.body.title) {
    const isRepeated = products.find(
     (product) => product.title === req.body.title
    );
    if (isRepeated.id !== idToUpdate) {
     const error = new Error(
      `This title: '${req.body.title}' already exists at id: ${productFinded.id}`
     );
     error.status = 422;
     throw error;
    }
   }

   const product = await product_manager.updateProduct(
    idToUpdate,
    dataToUpdate
   );
   return await product
 };

 /////////////////////////////
 // DELETE /api/products/:pid
 /////////////////////////////
 delete = async (pid) => {
  return await this.product_manager.deleteProduct(pid);
 };
}

export default ProductsDaoMemory;
