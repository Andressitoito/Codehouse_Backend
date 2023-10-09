/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
const router = Router();

/////////////////////////////
// MAIN CHAT
/////////////////////////////
router.get("/", async (req, res) => {
	try {
		return res.render("chat/chat", {
			title: "Chat with us!",
   script: 'chat.js'
		});
	} catch (error) {
		next(error);
	}
});


export default router;