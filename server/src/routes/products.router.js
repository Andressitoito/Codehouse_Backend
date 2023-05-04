/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router, application } from "express";
import product_manager from "../classes/product_manager.js";

const router = Router();

/////////////////////////////
// GET /api/products
/////////////////////////////
let api_products = "/";

router.get(api_products, async (req, res, next) => {
	try {
		let query = parseInt(req.query.limit);

		let products = await product_manager.getProducts(query);
		res.send({
			status: 200,
			success: true,
			message: `There are ${products.length} products`,
			products,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// GET /api/products/:pid
/////////////////////////////
let api_products_id = "/:pid";

router.get(api_products_id, async (req, res, next) => {
	try {
		let id = parseInt(req.params.pid);
		let product = await product_manager.getProductById(id);

		res.send({
			status: 200,
			success: true,
			product,
		});
	} catch (error) {
		next(error);
	}
});

export default router;

/* /////////////////////////////
// IMPORTS
/////////////////////////////
import { Router, application } from "express";
import product_manager from '../classes/product_manager.js'

const router = Router()

/////////////////////////////
// GET /api/products
/////////////////////////////
let api_products = "/";

router.get(api_products, async (req, res) => {
 try {
  let query = parseInt(req.query.limit);

  let products = await product_manager.getProducts(query);
  res.send({
   status: 200,
   success: true,
   message: `There are ${products.length} products`,
   products,
  });
 } catch (error) {
  res.send({
   status: 500,
   success: false,
   message: error.toString(),
  });
 }
});

/////////////////////////////
// GET /api/products/:pid
/////////////////////////////
let api_products_id = "/:pid";

router.get(api_products_id, async (req, res) => {
 try {
  let id = parseInt(req.params.pid);
  let product = await product_manager.getProductById(id);

  res.send({
   status: 200,
   success: true,
   product,
  });
 } catch (error) {
  res.send({
   status: 500,
   success: false,
   message: error.toString(),
  });
 }
});

export default router
 */
