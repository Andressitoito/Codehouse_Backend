/////////////////////////////
// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import productValidator from "../../../middlewares/product_validator.js";
import passport_call from "../../../middlewares/passport_call.js";
import { unauthorized_role } from "../../../middlewares/unauhorized_role.js";
import UsersController from "../../../controllers/user.controller.js";

class UsersDaoMongo {
	constructor() {}

	/////////////////////////////
	// GITHUB AUTH
	/////////////////////////////
	get = async () => {
		return await passport.authenticate(
			"github",
			{ scope: ["user:email"] },
			(req, res) => {}
		);
	};
}

export default UsersDaoMongo;