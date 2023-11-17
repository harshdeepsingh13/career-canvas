const authenticationMiddleware = require("../../../middlewares/authenticationMiddleware");
const {
    getTemplatesController,
    addNewTemplateController,
    getTemplateDetailsController, updateTemplateController
} = require("./template.controller");
const app = require("express").Router();

app.get("/all", authenticationMiddleware, getTemplatesController);

app.get("/:id", authenticationMiddleware, getTemplateDetailsController);

app.put("/:id", authenticationMiddleware, updateTemplateController)

app.post("/", authenticationMiddleware, addNewTemplateController);

module.exports = app;
