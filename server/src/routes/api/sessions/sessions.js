import { Router } from "express";
import { sendMaildefault } from "../../../utils/sendMail.js";
const sessions_router = Router();
import User from "../../../dao/mongo/users/models/Users.js";

sessions_router.get("/counter", async (req, res) => {
	if (!req.session.counter) {
		req.session.counter = 1;
	} else {
		req.session.counter++;
	}
	return res
		.status(200)
		.json({ message: `han ingresado ${req.session.counter} usuarios` });
});

sessions_router.get("/", async (req, res) => {
	return res.status(200).json({
		success: true,
		email: req.session.email,
	});
});

sessions_router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body;

		req.session.email = email;

		return res.status(200).json({
			success: true,
			message: `${email} has logged`,
		});
	} catch (error) {
		next(error);
	}
});

// const { first_name, email, role } = userdDb
// generate token

sessions_router.post("/forgot-password", async (req, res) => {
	const { email } = req.body;

	console.log('forgot clicked')

	let user = await User.findOne({ email });

	console.log(email)
	if (!user)
		return res.status(422).json({
			success: false,
			message: "there is no user",
		});

	console.log(user)

	// const userDB = {
	// 	first_name: user.first_name,
	// 	email,
	// 	role,
	// };

	// userDB
	const token = `generatetoken({ user, expireIn: "1h" })`;

	const subject = "Reset password";
	const html = `<html>
	<head>
			<title>Password Reset</title>
	</head>
	<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
	
			<table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border-collapse: collapse;">
					<tr>
							<td align="center" style="padding: 20px 0;">
									<img src="https://picsum.photos/150/150" alt="Logo" width="150" height="auto" style="display: block;">
							</td>
					</tr>
			</table>
	
			<table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border-collapse: collapse; background-color: #ffffff; max-width: 600px; margin: 0 auto;">
					<tr>
							<td style="padding: 40px 20px; text-align: center;">
									<h1 style="font-size: 24px; margin-bottom: 20px;">Reset Your Password</h1>
									<p style="font-size: 16px;">To reset your password, click the link below:</p>
									<p style="font-size: 16px;">
											<a href="http://localhost:8080/reset-password/${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
									</p>
									<p style="font-size: 16px; margin-top: 20px;">If you did not request a password reset, you can safely ignore this email.</p>
							</td>
					</tr>
			</table>
	
			<table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border-collapse: collapse; background-color: #f4f4f4;">
					<tr>
							<td style="padding: 20px 0; text-align: center;">
									<p style="font-size: 14px; color: #888;">&copy; ${new Date().getFullYear()} Plants And Grass. All rights reserved.</p>
							</td>
					</tr>
			</table>
	
	</body>
	</html>
	`;

	await sendMaildefault(email, subject, html);

	res.status(200).json({
		success: true,
		message: 'mail sent'
	});
});

sessions_router.get("reset-password/:token", (req, res) => {
	const token = req.params;

	if (!isValidToken(token))
		return res.send({ status: "error", message: "The link is deprecated" });

	res.cookie('tokenPass', process.env.SECRET_JWT, {}).send('Password set success')

	res.render("resetPass");
});

sessions_router.post('/confirm-password', (req, res) => {

	const { password, repeatPassword } = req.body

	// pedir user
	// confirm password de la base de datos
	// new pass === user.password
	// pass = passRepeat

	user.password = createHash
	user.save()

})


sessions_router.post("/signout", async (req, res, next) => {
	try {
		req.session.destroy();

		return res.status(200).json({
			success: true,
			message: `User signed out`,
		});
	} catch (error) {
		next(error);
	}
});

export default sessions_router;


sessions_router.get("reset-password/:token", (req, res) => {
	const token = req.params;

	if (!isValidToken(token))
		return res.send({ status: "error", message: "The link is deprecated" });

	res.cookie('tokenPass', process.env.SECRET_JWT, {}).send('Password set success')

	res.render("resetPass");
});