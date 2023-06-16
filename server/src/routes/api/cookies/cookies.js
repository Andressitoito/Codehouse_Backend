import { Router } from "express";

const cookies_router = Router();

// Unsigned cookid
cookies_router.get("/set", (req, res) => {
	return res
		.status(200)
		.cookie(
			"name_key",
			JSON.stringify({
				tipo: "objeto",
			}),
			{ maxAge: 20000, signed: true }
		)
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

cookies_router.get('/delete', (req,res) => {

 return res.status(200).clearCookie('name_key').json({
  success: true,
  message: 'cookie deleted'
 })
})

export default cookies_router;
