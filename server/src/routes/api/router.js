import { Router } from "express";

class RouterClass {
	constructor() {
		this.router = Router();
		this.init();
	}

	getRouter() {
		return this.router;
	}

	init() {}

	applyCallbacks(callbacks) {
		return callbacks.map((callback) => async (...params) => {
			try {
				await callback.apply(this, params);
			} catch (error) {
				console.error(error);
				params[1].status(500).send(error);
			}
		});
	}

	generateCustomResponses = (req, res, next) => {
		res.sendSuccess = (payload) => res.send({ status: "success", payload });
		res.sendServerError = (error) => res.send({ status: "error", error });
		res.sendUserError = (error) => res.send({ status: "success", error });
		next();
	};

	handlePolicies = (policies) => (req, res, next) => {
		if (policies[0] === "PUBLIC") return next();

		const authHeader = req.headers.authorization;

		if (!authHeader)
			return res.status(401).json({ status: "error", error: "unauthorized" });
		const token = authHeader.split(" ")[1];

		// ATENTION USE REAL SECRET
		let user = jwt.verify(token, process.env.SECRET_JWT);

		if (!policies.includes(user.role.toUpperCase())) {
			return res.status(403).json({ status: "error", error: "not authorized" });
		}

		req.user = user;

		next();
	};

	get(path, policies, ...callbacks) {
		this.router.get(
			path,
			this.handlePolicies(policies),
			this.generateCustomResponses,
			this.applyCallbacks(callbacks)
		);
	}

	post(path, policies, ...callbacks) {
		this.router.post(
			path,
			this.handlePolicies(policies),
			this.generateCustomResponses,
			this.applyCallbacks(callbacks)
		);
	}

	put(path, policies, ...callbacks) {
		this.router.put(
			path,
			this.handlePolicies(policies),
			this.generateCustomResponses,
			this.applyCallbacks(callbacks)
		);
	}

	delete(path, policies, ...callbacks) {
		this.router.delete(
			path,
			this.handlePolicies(policies),
			this.generateCustomResponses,
			this.applyCallbacks(callbacks)
		);
	}

}

export default RouterClass
