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
import { sendMail } from "../../../utils/sendMail.js";
import sendSms from "../../../utils/sensSms.js";
import generateUserFaker from "../../../utils/mocks/generateUserFaker.js";

import compression from "express-compression";
import generateProductFaker from "../../../utils/mocks/generateProductFaker.js";
import { faker } from "@faker-js/faker";
import multer from "multer";
import { uploader } from "../../../utils/uploader.js";

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

// const storage = multer.diskStorage({
// 	destination: async (req, file, cb) => {
// 				try {

// 					console.log('proeri aca')
// 			const user_id = req.user._id;
// 			const destinationFolder = `uploads/${user_id}/documents`;
// 			await fs.mkdir(destinationFolder, { recursive: true });
// 			cb(null, destinationFolder);
// 		} catch (error) {
// 			cb(error, null);
// 		}
// 	},
// 	filename: (req, file, cb) => {
// 		const uniqueFileName = `${req.params.uid}_${file.fieldname}_${Date.now()}_${file.originalname}`;
// 		cb(null, uniqueFileName);
// 	},
// });

// const uploader = multer({ storage: storage });

/////////////////////////////
// USER PREMIUM
/////////////////////////////
auth_router.post(
	"/:uid/documents",
	passport_call("jwt", { session: false }),
	// uploader.array(["photo_profile", "photo_ID", "address_bill"], 3),
	async (req, res) => {

		console.log("FILES PROCESSED CORRECTLY IN UPLOADER");

		return res.status(200).json({
			success: true,
			message: "User logged out successfully",
		});
	}
);

// auth_router.post(
// 	"/:uid/documents",
// 	uploader.array(["photo_profile", "photo_ID", "address_bill"], 3),
// 	async (req, res) => {

// 		console.log('gets here')
// 		try {
// 			// Access uploaded files via req.files
// 			const uploadedFiles = req.files;

// 			// Check if files were uploaded successfully
// 			if (uploadedFiles && uploadedFiles.length > 0) {
// 				// Files were uploaded successfully
// 				console.log("FILES PROCESSED CORRECTLY IN ROUTE HANDLER");

// 				// Additional processing or handling of the uploaded files can be done here

// 				return res.status(200).json({
// 					success: true,
// 					message: "Files uploaded successfully",
// 				});
// 			} else {
// 				// No files were uploaded or an error occurred
// 				console.log("FILES NOT UPLOADED OR ERROR OCCURRED");

// 				return res.status(400).json({
// 					success: false,
// 					message: "No files uploaded or an error occurred during upload.",
// 				});
// 			}
// 		} catch (error) {
// 			console.error("Error processing uploaded files:", error);
// 			return res.status(500).json({
// 				success: false,
// 				message: "Error processing uploaded files",
// 			});
// 		}
// 	}
// );

/////////////////////////////
// SEND USER CURRENT ID
/////////////////////////////
auth_router.get("/user_id", passport_call("jwt"), (req, res) => {
	const id = req.user._id;
	res.status(200).json({
		uid: id,
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

/////////////////////////////
// TEST COMPRESSION
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

/////////////////////////////
// TEST MAIL
/////////////////////////////
auth_router.get("/mail", async (req, res) => {
	await sendMail();
	res.send("send MAIL");
});

/////////////////////////////
// TEST SMS
/////////////////////////////
auth_router.get("/sms", async (req, res) => {
	await sendSms("Andy", "Ledesma");
	res.send("send SMS");
});

/////////////////////////////
// MOCK USER
/////////////////////////////
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

/////////////////////////////
// MOCK PRODUCTS
/////////////////////////////
auth_router.get("/mockingproducts", (req, res) => {
	let products = [];

	for (let i = 0; i < 100; i++) {
		products.push(generateProductFaker());
	}

	res.send({
		status: "success",
		payload: products,
	});
});

/////////////////////////////
// ERROR TESTS
/////////////////////////////
auth_router.get("/logger", (req, res) => {
	req.logger.info(`Loggertest: ${new Date().toLocaleString()}`);
	res.send("Registered & Error");
});

/////////////////////////////
// TEST ALL ERROR LOGS
/////////////////////////////
auth_router.get("/loggerTest", (req, res) => {
	req.logger.fatal(`Logger fatal test: ${new Date().toLocaleString()}`);
	req.logger.error(`Logger error test: ${new Date().toLocaleString()}`);
	req.logger.warn(`Logger warning test: ${new Date().toLocaleString()}`);
	req.logger.info(`Logger info test: ${new Date().toLocaleString()}`);
	req.logger.debug(`Logger debug test: ${new Date().toLocaleString()}`);
	res.send("Errors registered");
});

/////////////////////////////
// ARTILLERY SIMPLE
/////////////////////////////
auth_router.get("/simpleOperation", (req, res, next) => {
	let suma = 0;

	for (let i = 0; i < 100000; i++) {
		suma += i;
	}

	// artillery quick --count 40 --num 50 "http://localhost:8080/api/auth/simpleOperation" -o simple.json
	// artillery quick --count 40 --num 50 "http://localhost:8080/api/auth/complexOperation" -o complex.json
	res.send(`Simple operation ${suma}`);
});

/////////////////////////////
// ARTILLERY COMPLEX
/////////////////////////////
auth_router.get("/complexOperation", (req, res, next) => {
	let suma = 0;

	for (let i = 0; i < 100000000; i++) {
		suma += i;
	}

	res.send(`complex operation ${suma}`);
});

auth_router.get("/testUser", (req, res) => {
	let persona = {
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
	};

	res.send({
		status: "success",
		payload: persona,
	});
});

export default auth_router;
