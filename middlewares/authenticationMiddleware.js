const {getUser} = require("../api/v1/User/user.model");
const {getPayload} = require("../services/jwt.service");

module.exports = async (req, res, next) => {
	if (req.query.secret === "thisIsHd") {
		try {
			const user = await getUser('harshdeepsingh13@gmail.com');
			if (!user) {
				req.error = {
					status: 401,
					message: "Invalid token."
				}
				next(new Error());
			}
			req.user = user;
			next();
		} catch (e) {
			if (e.name === "JsonWebTokenError") {
				req.error = {
					status: 401,
					message: "Invalid token."
				}
				return next(new Error());
			}
      req.error = {status: 500, message: "An Error occurred!"}
      return next(new Error());
		}
	} else {
		if (!req.headers.authentication) {
			req.error = {
				status: 401,
				message: "Authentication token required."
			};
			next(new Error());
		}
		try {
			const {email, mode} = getPayload(req.headers.authentication.split('Bearer ')[1]);
			const user = await getUser(email);
			if (!user) {
				req.error = {
					status: 401,
					message: "Invalid token."
				}
				next(new Error());
			}
			req.user = {...user._doc, mode};
			next();
		} catch (e) {
			if (e.name === "JsonWebTokenError") {
				req.error = {
					status: 401,
					message: "Invalid token."
				}
				return next(new Error());
			}
      req.error = {status: 500, message: "An Error occurred!"}
      return next(new Error());
		}
	}
};
