export default function user_validator(req, res, next) {
	const { password, email, name } = req.body;

	if (!name || !password || !email) {
		return res.status(422).json({
			success: false,
			message: "Error on password, name or email",
		});
	} else {
		next();
	}
}
