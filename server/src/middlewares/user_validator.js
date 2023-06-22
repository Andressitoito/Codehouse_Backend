export default function user_validator(req, res, next) {
	const { name, password, email } = req.body;

	if (!name || !password || !email) {
		return res.status(422).json({
			success: false,
			message: "Error on password, name or email",
		});
	} else {
		next();
	}
}
