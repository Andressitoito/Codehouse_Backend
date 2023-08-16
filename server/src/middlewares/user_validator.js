// import { UserDTO } from "../dto/user.dto";

import CustomError from "../utils/error/customError.js";
import { EErrors } from "../utils/error/enums.js";
import generateInfoUser from "../utils/error/gereateInfoUser.js";

export default function user_validator(req, res, next) {
	const { password, email, name } = req.body;

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
