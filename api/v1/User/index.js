const express = require("express");

const {
    deleteEducationInformationController,
    deleteProjectInformationController,
    deleteTrainingInformationController,
    deleteWorkExperienceController,
    getBasicInformationController,
    getCompleteInformationController,
    getEducationInformationController,
    getProjectInformationController,
    getSkillInformationController,
    getTrainingInformationController,
    getWorkExperiencesController,
    loginController,
    registerController,
    updateBasicInformationController,
    updatedProjectInformationController,
    updatedTrainingInformationController,
    updateEducationInformationController,
    updateSkillInformationController,
    updateWorkExperiencesController,
    getProfessionalSummaryController
} = require('./user.controller');
const authenticationMiddleware = require("../../../middlewares/authenticationMiddleware");
const portfolioTokenBlocker = require("../../../middlewares/portfolioTokenBlocker");

const app = express.Router();

app.post('/login', loginController);

app.post('/register', registerController);

app.get('/basicInformation', authenticationMiddleware, portfolioTokenBlocker, getBasicInformationController);

app.get("/professionalSummary", authenticationMiddleware, getProfessionalSummaryController)

app.post('/basicInformation', authenticationMiddleware, portfolioTokenBlocker, updateBasicInformationController);

app.get('/educationInformation', authenticationMiddleware, portfolioTokenBlocker, getEducationInformationController);

app.post('/educationInformation', authenticationMiddleware, portfolioTokenBlocker, updateEducationInformationController);

app.delete('/educationInformation', authenticationMiddleware, portfolioTokenBlocker, deleteEducationInformationController);

app.get('/skillInformation', authenticationMiddleware, portfolioTokenBlocker, getSkillInformationController);

app.post('/skillInformation', authenticationMiddleware, portfolioTokenBlocker, updateSkillInformationController);

app.get('/workExperienceInformation', authenticationMiddleware, portfolioTokenBlocker, getWorkExperiencesController);

app.post('/workExperienceInformation', authenticationMiddleware, portfolioTokenBlocker, updateWorkExperiencesController);

app.delete('/workExperienceInformation', authenticationMiddleware, portfolioTokenBlocker, deleteWorkExperienceController);

app.post('/trainingInformation', authenticationMiddleware, portfolioTokenBlocker, updatedTrainingInformationController);

app.delete('/trainingInformation', authenticationMiddleware, portfolioTokenBlocker, deleteTrainingInformationController);

app.get('/trainingInformation', authenticationMiddleware, portfolioTokenBlocker, getTrainingInformationController);

app.get('/projectInformation', authenticationMiddleware, portfolioTokenBlocker, getProjectInformationController);

app.post('/projectInformation', authenticationMiddleware, portfolioTokenBlocker, updatedProjectInformationController);

app.delete('/projectInformation', authenticationMiddleware, portfolioTokenBlocker, deleteProjectInformationController);

app.get('/completeInformation', authenticationMiddleware, getCompleteInformationController);

module.exports = app;
