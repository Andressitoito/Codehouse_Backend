export default function errorMiddleware(err, req, res, next) {
	switch (error.code) {
		case EErrors.INVALID_TYPE_ERROR:
			return res.send({ status: "error", error: error.name });
			break;

		case EErrors.DATABASE_ERROR:
			return res.send({ status: "error", error: error.name });
			break;

		case EErrors.ROUTING_ERROR:
			return res.send({ status: "error", error: error.name });
			break;
		default:
			res.send({ status: "error", error: "Undefied error" });
			break;
	}
}
