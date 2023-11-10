const app = require('express').Router();
const userController = require('./User');
const resumeTemplateController = require('./ResumeTemplate');

app.use("/user", userController)
app.use("/resumeTemplate", resumeTemplateController)

module.exports = app;
