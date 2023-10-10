export default function password_8_char(req, res, next) {
	const { password } = req.body;

	if (password.length < 8) {
		return res.status(422).json({
			success: false,
			message: "The password must have at least 8 characters",
		});
	} else {
		next();
	}
}
