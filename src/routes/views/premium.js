/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
const router = Router();

/////////////////////////////
// USER PREMIUM
/////////////////////////////
router.get("/", async (req, res, next) => {
	console.log("user premium");
	try {
		return res.render("user/premium", {
			script: "premium.js",
			title: 'super title'
		});
	} catch (error) {
		next(error);
	}
});

export default router;
