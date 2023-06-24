import { compareSync } from "bcrypt";

export default async function valid_password(req, res, next) {
	const verified = compareSync(req.body.password, req.user.password);

	if (verified) {
		return next();
	}

	return req.status(401).json({
		success: false,
		message: "Auth error",
	});
}

