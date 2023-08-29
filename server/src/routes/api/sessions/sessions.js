import { Router } from "express";
import sendMail from "../../../utils/sendMail";
const sessions_router = Router();

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

	let user = await userService.getUser({ email });
	if (!user)
		return res.status(422).json({
			success: false,
			message: "there is no user",
		});

	const userDB = {
		first_name: user.first_name,
		email,
		role,
	};

	userDB
	const token = generatetoken({ user, expireIn: "1h" });

	const subject = "Reset password";
	const html = `
	<p>Reset password</p>
	<p>To reset password click</p>
	<a href='http://localhost:8080/reset-password/${token}'>Here</a>
	`;

	await sendMail(email, subject, html);

	res.send("reset password sent");
});

sessions_router.get("reset-password/:token", ["USER", "ADMIN"], (req, res) => {
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
