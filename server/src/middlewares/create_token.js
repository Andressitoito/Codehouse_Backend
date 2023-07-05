import jwt from "jsonwebtoken";

export default function create_token(req, res, next) {

	let token = jwt.sign({ 
		email: req.user.email,
		role: req.user.role,
		name: req.user.name
	}, process.env.SECRET_JWT, {
		expiresIn: 60 * 60 * 24 * 7,
	});

	req.token = token;
	return next();
}
