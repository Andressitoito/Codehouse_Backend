export const redirect_unauthorized = (req, res, next) => {
	if (typeof req.user === "undefined") {
		return res.redirect("/");
	}

	next();
};
