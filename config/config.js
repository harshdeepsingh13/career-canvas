const winston = require('winston');
const {format} = winston;

const {combine, timestamp, printf, colorize} = format;
const myFormat = printf(({level, message, label, timestamp}) => {
	return `${level} [${timestamp}] ${message}`;
});

let mongodbConnectionURL = process.env.MONGODB_URI;
module.exports = {
  emailRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  phoneRegex: /^\d{10}$/g,
	logger: winston.createLogger({
		format: combine(
			// label({ label: 'right meow!' }),
			colorize(),
			timestamp(),
			myFormat,
			// prettyPrint(),

		),
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({filename: 'dev_api.log'})
		]
	}),
	mongodbConnectionURL,
	cloudinary: {
		defaultResponseURL: process.env.CLOUDINARY_DEFAULT_RESPONSE_URL
	},
	tokenModes: {
		normal: "normal",
		portfolio: "portfolio"
	},
	collectionNames: {
		user: "user",
		education: "education",
		image: "image",

	}
}
