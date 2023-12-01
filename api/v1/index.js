const app = require('express').Router();
const userController = require('./User');
const resumeTemplateController = require('./ResumeTemplate');
const jobScrapperController = require("./JobScrapper");
const coverLetterController = require("./CoverLetter")

app.use("/user", userController)
app.use("/resumeTemplate", resumeTemplateController)
app.use("/coverLetter", coverLetterController);
app.use("/jobs", jobScrapperController)

module.exports = app;
