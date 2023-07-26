// import { UserDTO } from "../dto/user.dto";

export default function user_validator(req, res, next) {
	const { password, email, name } = req.body;


	// let newUser = new UserDTO({first_name, last_name, email, password})


	if (!name || !password || !email) {
		return res.status(422).json({
			success: false,
			message: "Error on password, name or email",
		});
	} else {
		next();
	}
}

