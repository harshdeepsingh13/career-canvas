const mongoose = require("mongoose");

module.exports = mongoose.Schema(
	{
		user: {
			type: String,
			required: true,
			index: true
		},
		name: {
			type: String
		},
		startDate: {
			type: Date
		},
		endDate: {
			type: Date
		},
		summary: {
			type: String
		},
		link: {
			type: String
		}
	},
	{
		timestamps: true
	}
);
