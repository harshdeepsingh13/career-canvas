const mongoose = require("mongoose");

module.exports = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            index: true
        },
        skills: Array,
        skillCategories: {
            type: [
                {
                    category: { type: String },
                    description: { type: String },
                    skills: [String],
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true
    }
);
