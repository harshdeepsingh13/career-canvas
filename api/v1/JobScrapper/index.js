const authenticationMiddleware = require("../../../middlewares/authenticationMiddleware");
const {scrapperController} = require("./scrapper.controller");
const {createRateLimiter} = require("../../../middlewares/rateLimiter");
const app = require("express").Router();

const jobsRateLimiter = createRateLimiter({
	windowMs: 60 * 1000,
	maxRequests: 30,
	message: "Too many job search requests. Try again shortly."
});

app.get("/search", authenticationMiddleware, jobsRateLimiter, scrapperController)
// app.get("/search", authenticationMiddleware, scrapperController)

module.exports = app;
