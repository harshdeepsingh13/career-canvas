const {generateCoverLetterController} = require("./coverLetter.controller");
const authenticationMiddleware = require("../../../middlewares/authenticationMiddleware");
const {createRateLimiter} = require("../../../middlewares/rateLimiter");
const app = require("express").Router();

const coverLetterRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 5,
    message: "Too many cover letter requests. Please wait before generating another."
});

app.post("/generate", authenticationMiddleware, coverLetterRateLimiter, generateCoverLetterController)

module.exports = app;
