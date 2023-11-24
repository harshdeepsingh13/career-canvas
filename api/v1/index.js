const app = require('express').Router();
const userController = require('./User');
const resumeTemplateController = require('./ResumeTemplate');
const jobScrapperController = require("./JobScrapper");

app.use("/user", userController)
app.use("/resumeTemplate", resumeTemplateController)
app.use("/jobs", jobScrapperController)

module.exports = app;
