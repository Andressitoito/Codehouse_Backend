export const redirect_unauthorized = (req, res, next) => {

 console.log("req.user ", req.user)
	if (typeof req.user === "undefined") {
		return res.redirect("/");
	}

	next();
};
