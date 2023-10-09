import { hashSync, genSaltSync } from "bcrypt";

export default function create_hash(req, res, next) {
	try {
		const { password } = req.body;

		const hash_password = hashSync(password, genSaltSync());

		req.body.password = hash_password;

		return next();
	} catch (error) {
		next(error);
	}
}
