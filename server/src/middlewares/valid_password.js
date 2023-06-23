import { compareSync } from "bcrypt";
import User from "../models/Users.js";

export default async function valid_password(req, res, next) {
	// const user = await User.findOne({ email: req.body.email });
	//
	// if (user) {
	const verified = compareSync(req.body.valid_password, user.password);

	if (verified) {
		return next();
	}

	return req.status(401).json({
		success: false,
		message: "Auth error",
	});
}
