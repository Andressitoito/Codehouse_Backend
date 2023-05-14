function productValidator(req, res, next) {
	const { title, description, price, thumbnail } = req.body;
	if (!title) {
		return res.json({
			status: 422,
			success: false,
			message: "Title is required",
		});
	}
	if (!description) {
		return res.json({
			status: 422,
			success: false,
			message: "Description is required",
		});
	}
	if (!price) {
		return res.json({
			status: 422,
			success: false,
			message: "Price is required",
		});
	}
	if (!thumbnail) {
		return res.json({
			status: 422,
			success: false,
			message: "Thumbnail is required",
		});
	}
	next();
}

export default productValidator;
