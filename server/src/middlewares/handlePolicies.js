const handlePolicies = (policies) => (req, res, next) => {
 if (policies[0] === "") return next();

 if (!policies.includes(req.user.role.toUpperCase())) {
  return res.status(403).json({ status: "error", error: "not authorized" });
 }

 next();
};

export default handlePolicies;

