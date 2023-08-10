import createProductError from "../utils/errors/productError/createProductError.js";
import { productEnumsError } from "../utils/errors/productError/productEnumsError.js";
import ProductError from "../utils/errors/productError/productError.js";

function productValidator(req, res, next) {
	const { title, description, price, thumbnail } = req.body;

	if (!title || !description || !thumbnail || !price) {
		ProductError.createError({
			name: "Product creation error",
			cause: createProductError(title, description, thumbnail, price),
			message: "Error creating product",
			code: productEnumsError.INVALID_TYPE_ERROR,
		});

		return res.status(422).json({
			success: false,
			message: "Error creating product",
		});
	}
	next();
}

export default productValidator;
