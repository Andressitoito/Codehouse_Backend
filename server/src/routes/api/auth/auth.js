/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
import user_validator from "../../../middlewares/user_validator.js";
import password_8_char from "../../../middlewares/password_8_char.js";
import User from "../../../models/Users.js";
import create_hash from "../../../middlewares/create_hash.js";
import valid_password from "../../../middlewares/valid_password.js";
import passport from "passport";

/////////////////////////////
// VARIABLES
/////////////////////////////
const auth_router = Router();

/////////////////////////////
// CHECK USER STATUS & ROLE
/////////////////////////////
auth_router.get("/checkLog", passport.authenticate('session'), async (req, res, next) => {
	try {
		if (!req.isAuthenticated()) {
			return res.status(200).json({
				success: true,
				checkLog: false,
				user_role: 0,
			});
		}

		return res.status(200).json({
			success: true,
			checkLog: true,
			user_role: req.user.role,
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
	create_hash,
	passport.authenticate("register", { failureRedirect: "/fail-register" }),
	(req, res) => {
		return res.status(201).json({
			success: true,
			message: "User created",
		});
	}
);

auth_router.get("/fail-register", (req, res) => {
	return res.status(400).json({
		success: false,
		message: "error auth",
	});
});

/////////////////////////////
// USER SIGN IN
/////////////////////////////
auth_router.post(
	"/signin",
	password_8_char,
	passport.authenticate("signin", {
		failureRedirect: "/api/auth/fail-signin",
	}),
	valid_password,
	async (req, res, next) => {
		try {
			const { email } = req.body;

			req.session.email = email;
			req.session.role = req.user.role;

			return res.status(200).json({
				success: true,
				message: "User signed in",
			});
		} catch (error) {
			next(error);
		}
	}
);

auth_router.get("/fail-signin", (req, res) => {
	return res.status(400).json({
		success: false,
		message: "error auth",
	});
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
