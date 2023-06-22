/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
import user_validator from "../../../middlewares/user_validator.js";
import password_8_char from "../../../middlewares/password_8_char.js";
import User from "../../../models/Users.js";

/////////////////////////////
// VARIABLES
/////////////////////////////
const auth_router = Router();

/////////////////////////////
// CHECK USER STATUS & ROLE
/////////////////////////////
auth_router.get("/checkLog", async (req, res, next) => {
	try {
		let checkLog = req.session.email;
		let user_role = req.session.role;

		checkLog = checkLog ?? false;
		user_role = user_role ?? 0;

		return res.status(200).json({
			success: true,
			checkLog,
			user_role,
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// USER REGISTER
/////////////////////////////
auth_router.post(
	"/register",
	user_validator,
	password_8_char,
	async (req, res, next) => {
		try {
			await User.create(req.body);
			return res.status(201).json({
				success: true,
				message: "User created",
			});
		} catch (error) {
			next(error);
		}
	}
);

/////////////////////////////
// USER SIGN IN
/////////////////////////////
auth_router.post("/signin", async (req, res, next) => {
	try {
		const { email } = req.body;

		const one = await User.findOne({ email });

		if (one) {
			req.session.email = email;
			req.session.role = one.role;

			return res.status(200).json({
				success: true,
				message: "User signed in",
				name: one.name,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// USER SIGN OUT
/////////////////////////////
auth_router.post("/signout", async (req, res, next) => {
	try {
		req.session.destroy();
		return res.status(200).json({
			success: true,
			message: "User successfuly loged out",
		});
	} catch (error) {
		next(error);
	}
});

export default auth_router;
