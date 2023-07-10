export const unauthorized_role = (req, res, next) => {

	if (req.user.role !== 1) {
		return res.redirect("/");
	}

	next();
};
