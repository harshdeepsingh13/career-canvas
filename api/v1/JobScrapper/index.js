const authenticationMiddleware = require("../../../middlewares/authenticationMiddleware");
const {scrapperController} = require("./scrapper.controller");
const app = require("express").Router();

app.get("/search", scrapperController)
// app.get("/search", authenticationMiddleware, scrapperController)

module.exports = app;
