const errorHandler = (error, req, res, next) => {
	const status = error.status || 500;
	return res.status(500).json({
		status,
		method: req.method,
		path: req.url,
		response: error.toString(),
	});
};

export default errorHandler;
