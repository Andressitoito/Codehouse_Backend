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
import password_is_ok from "../../../middlewares/password_is_ok.js";
import create_token from "../../../middlewares/create_token.js";
import passport_call from "../../../middlewares/passport_call.js";

/////////////////////////////
// VARIABLES
/////////////////////////////
const auth_router = Router();

/////////////////////////////
// GITHUB AUTH
/////////////////////////////

auth_router.get(
	"/github/callback",
	passport.authenticate("github", { scope: ["user:email"] }, (req, res) => {
		console.log("user loged in");
		return res.status(200).json({
			success: true,
			message: "User loged in wtih Github",
		});
	})
);

// auth_router.get(
// 	"/github/callback",
// 	passport.authenticate("github"),
// 	{ failureRedirect: "/api/auth/fail-register" },
// 	(req, res) => res.status(200).redirect("/")
// );

auth_router.get("/fail-register/github", (req, res) =>
	res.status(403).json({
		success: false,
		message: "Bad github auth",
	})
);

// auth_router.get("/fail-register", (req, res) => {
// 	return res.status(400).json({
// 		success: false,
// 		message: "error auth",
// 	});
// });
/////////////////////////////
// CHECK USER STATUS & ROLE
/////////////////////////////

/////////////////////////////
// CHECK USER STATUS & ROLE
/////////////////////////////
auth_router.get(
	"/checkLog",
	passport.authenticate("session"),
	async (req, res, next) => {
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
	}
);

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
	passport.authenticate("login", {
		failureRedirect: "/api/auth/fail-signin",
	}),
	password_is_ok,
	create_token,
	async (req, res, next) => {
		try {
			console.log(req.user.name);
			console.log(req.user.name);

			const username = req.user.name;
			console.log('///////////////////')
			console.log(req.token)
			console.log('///////////////////')

			return res
				.status(200)
				.cookie("token", req.token, { maxAge: 60 * 60 * 1000 })
				.json({
					success: true,
					message: "User signed in",
					username,
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
// auth_router.post("/signout", async (req, res, next) => {
// 	try {
// 		req.session.destroy();
// 		return res.status(200).json({
// 			success: true,
// 			message: "User successfuly loged out",
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

/////////////////////////////
// USER SIGN OUT
/////////////////////////////
auth_router.post(
	"/signout",
	passport_call("jwt", { session: false }),
	async (req, res, next) => {
		return res.status(200).clearCookie("token").json({
			success: true,
			message: "User logged out successfully",
		});
	}
);

export default auth_router;

