/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
const router = Router();

/////////////////////////////
// MAIN HOME
/////////////////////////////
router.get("/", async (req, res, next) => {
	try {
		return res.render("home/home", {
			title: "Welcome",
		});
	} catch (error) {
		next(error);
	}
});

export default router;
