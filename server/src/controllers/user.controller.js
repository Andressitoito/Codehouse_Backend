/////////////////////////////
// IMPORTS
/////////////////////////////
import { usersService } from "../service/index.js";

class UsersController {
	constructor() {
		this.usersService = usersService;
	}

	/////////////////////////////
	// GET /api/products
	/////////////////////////////
 githubAuth(req, res, next) {
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
}

}

export default UsersController;
