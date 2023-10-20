const config = require("../config/config");

module.exports = (req, res, next) => {
	const {mode} = req.user;
	if (mode === config.tokenModes.portfolio) {
		req.error = {
			status: 401,
			message: "Invalid token."
		}
		return next(new Error());
	} else
		return next();
};
