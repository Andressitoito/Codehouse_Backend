class ProductError {
	static createError({ name = "Product Error", cause, message, code = 1 }) {
		let error = new Error(message);

		error.name = name;
		error.cause = cause;
		error.code = code;

		throw error;
	}
}

export default ProductError;
