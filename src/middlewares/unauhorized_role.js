export const unauthorized_role = (req, res, next) => {

	if (req.user.role !== 'ADMIN') {
		return res.redirect("/");
	}

	next();
};
