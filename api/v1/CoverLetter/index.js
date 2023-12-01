const {generateCoverLetterController} = require("./coverLetter.controller");
const authenticationMiddleware = require("../../../middlewares/authenticationMiddleware");
const app = require("express").Router();

// app.get("/generate", authenticationMiddleware, generateCoverLetterController)

app.get("/generate", authenticationMiddleware, generateCoverLetterController)

module.exports = app;
