const authenticationMiddleware = require("../../../middlewares/authenticationMiddleware");
const {
    getTemplatesController,
    addNewTemplateController,
    getTemplateDetailsController,
    updateTemplateController,
    getPDFTemplateController
} = require("./template.controller");
const {createRateLimiter} = require("../../../middlewares/rateLimiter");
const app = require("express").Router();

const pdfRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 10,
    message: "Too many PDF requests. Try again shortly."
});

app.get("/all", authenticationMiddleware, getTemplatesController);

app.get("/:id", authenticationMiddleware, getTemplateDetailsController);

app.put("/:id", authenticationMiddleware, updateTemplateController)

app.post("/", authenticationMiddleware, addNewTemplateController);

app.get("/pdfTemplate/:id", authenticationMiddleware, pdfRateLimiter, getPDFTemplateController);

app.get("/pdfTemplate/:id/download", authenticationMiddleware, pdfRateLimiter, getPDFTemplateController);

module.exports = app;
