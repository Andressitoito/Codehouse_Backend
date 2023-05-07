/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
import cart_manager from "../../../classes/cart_manager.js";

const router = Router();

/////////////////////////////
// GET /api/carts
/////////////////////////////
let api_carts = "/";

router.get(api_carts, async (req, res, next) => {
	try {
		let carts = await cart_manager.getCarts();

		console.log(carts);
		res.json({
			status: 200,
			success: true,
			carts,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// GET /api/carts/:cid
/////////////////////////////
let api_cart_by_id = "/:cid";

router.get(api_cart_by_id, async (req, res, next) => {
	try {
		let cid = parseInt(req.params.cid);

		let cart = await cart_manager.getCartById(cid);

		res.json({
			status: 200,
			success: true,
			cart,
		});
	} catch (error) {
		next(error);
	}
});

export default router;
