import product_manager from "../Manager/Product_manager.js";

function areUnits(req, res, next) {
	const units = Number(req.params.units);
	const id = Number(req.params.pid);

	const stock = product_manager.getProductById(id).stock;

	if (units > stock) {
		return res.json({
			status: 422,
			success: false,
			message: "Not enough stock",
		});
	}

	next();
}

export default areUnits