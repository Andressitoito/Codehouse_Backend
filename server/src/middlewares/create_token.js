import jwt from "jsonwebtoken";

export default function create_token(req, res, next) {

	console.log("FROM TOKEN CREATION ", req.user)
	let token = jwt.sign({ 
		email: req.body.email,
		role: req.user.role,
		name: req.user.name
	}, process.env.SECRET_JWT, {
		expiresIn: 60 * 60 * 24 * 7,
	});

	req.token = token;
	return next();
}
