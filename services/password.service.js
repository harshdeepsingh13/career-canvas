const bcrypt = require("bcryptjs");
const config = require("../config/config");

const saltRounds = 10;
const {logger} = config;

exports.encryptPassword = password => {
	return bcrypt.hashSync(password, saltRounds)
};

exports.comparePassword = (encryptedPassword, plainTextPassword) =>
	bcrypt.compareSync(plainTextPassword, encryptedPassword);
