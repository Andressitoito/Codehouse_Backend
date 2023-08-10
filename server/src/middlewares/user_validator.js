// import { UserDTO } from "../dto/user.dto";

import CustomError from "../utils/errors/userError/customError.js";
import { EErrors } from "../utils/errors/userError/enums.js";
import generateInfoUser from "../utils/errors/userError/gereateInfoUser.js";

export default function user_validator(req, res, next) {
	const { password, email } = req.body;

	if (!name || !password || !email) {
		CustomError.createError({
			name: "User creation error",
			cause: generateInfoUser(password, email, name),
			message: "Error creating user",
			code: EErrors.INVALID_TYPE_ERROR,
		});

		return res.status(422).json({
			success: false,
			message: "Error on password, name or email",
		});
	} else {
		next();
	}
}
