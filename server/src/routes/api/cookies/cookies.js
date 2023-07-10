import { Router } from "express";

const cookies_router = Router();

// Unsigned cookid
cookies_router.get("/set/:email", (req, res) => {
	const { email } = req.params;
	console.log(email)

	return res
		.status(200)
		.cookie("user", JSON.stringify(email), { maxAge: 60000, signed: true })
		.json({
			success: true,
			message: "cookie set",
		});
});

cookies_router.get("/", (req, res) => {
	return res.status(200).json({
		success: true,
		cookies: req.cookies,
	});
});

// Signed cookie
cookies_router.get("/get", (req, res) => {
	return res.status(200).json({
		success: true,
		cookies: req.signedCookies,
	});
});

cookies_router.get("/delete", (req, res) => {
	return res.status(200).clearCookie("name_key").json({
		success: true,
		message: "cookie deleted",
	});
});

export default cookies_router;
