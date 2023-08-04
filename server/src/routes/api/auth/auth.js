/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
import user_validator from "../../../middlewares/user_validator.js";
import password_8_char from "../../../middlewares/password_8_char.js";
import create_hash from "../../../middlewares/create_hash.js";
import passport from "passport";
import password_is_ok from "../../../middlewares/password_is_ok.js";
import create_token from "../../../middlewares/create_token.js";
import passport_call from "../../../middlewares/passport_call.js";
import sendMail from "../../../utils/sendMail.js";
import sendSms from "../../../utils/sensSms.js";
import generateUserFaker from "../../../utils/mocks/generateUserFaker.js";

import compression from "express-compression";
import router from "../carts/carts.mongo.js";
/////////////////////////////
// VARIABLES
/////////////////////////////
const auth_router = Router();
auth_router.use(
	compression({
		rotli: {
			enabled: true,
			zlib: {},
		},
	})
);

/////////////////////////////
// GITHUB AUTH
/////////////////////////////

auth_router.get("/stringlargo", (req, res) => {
	let string = `Hi I am a super long string super long`;

	let num = 0;

	for (let i = 0; i < 5e5; i++) {
		num++;
		string += `
	Hola ${num}
	`;
	}

	res.send(string);
});

auth_router.get("/mail", async (req, res) => {
	await sendMail();
	res.send("send MAIL");
});

auth_router.get("/sms", async (req, res) => {
	await sendSms("Andy", "Ledesma");
	res.send("send SMS");
});

auth_router.get("/mockuser", (req, res) => {
	let users = [];

	for (let i = 0; i < 100; i++) {
		users.push(generateUserFaker());
	}

	res.send({
		status: "success",
		payload: users,
	});
});

auth_router.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] }, (req, res) => {})
);

auth_router.get(
	"/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/api/auth/fail-register",
	}),
	create_token,
	async (req, res, next) => {
		try {
			return res
				.cookie("token", req.token, { maxAge: 60 * 60 * 1000 })
				.redirect("/carts_mongo");
		} catch (error) {
			next(error);
		}
	}
);

auth_router.get("/fail-register", (req, res) =>
	res.status(403).json({
		success: false,
		message: "Bad github auth",
	})
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
// USER SIGN IN EMAIL * PASS
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
			const username = req.user.name;

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

///////////////////////////
// USER SIGN OUT
///////////////////////////
auth_router.post("/signout-session", async (req, res, next) => {
	try {
		return res.status(200).json({
			success: true,
			message: "User successfuly logged out",
		});
	} catch (error) {
		next(error);
	}
});

/////////////////////////////
// USER SIGN OUT
/////////////////////////////
auth_router.post(
	"/logout",
	passport_call("jwt", { session: false }),
	async (req, res, next) => {
		delete req.user;

		return res.status(200).clearCookie("token").json({
			success: true,
			message: "User logged out successfully",
		});
	}
);

/////////////////////////////
// DEV-TOOL USER SIGNOUT FORCE
/////////////////////////////
auth_router.post("/logout/jwt-force", async (req, res, next) => {
	delete req.user;

	return res.status(200).clearCookie("token").json({
		success: true,
		message: "User logged out successfully",
	});
});

/////////////////////////////
// USER CURRENT STATE
/////////////////////////////
auth_router.get("/current", passport_call("jwt"), (req, res) => {
	const token = req.cookies.token;
	const user = req.user.name;
	const role = req.user.role;

	console.log(req.user);

	res.send(`
				<html>
				<head>
						<style>
								body {
										background-color: #000;
										color: #fff;
										text-align: center;
										padding: 100px;
										font-size: 24px;
								}
								div {
										width: 75%;
										margin: 0 auto;
										overflow-wrap: break-word;
								}
						</style>
				</head>
				<body>
						<h3>User: ${user}</h3>
						<h4>Role: ${role}</h4>
						<div>
								<p>Token: ${token}</p>
						</div>
				</body>
		</html>
  `);
});

export default auth_router;
