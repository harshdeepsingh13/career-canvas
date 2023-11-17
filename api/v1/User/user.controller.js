const {getToken} = require("../../../services/jwt.service");
const {comparePassword, encryptPassword} = require("../../../services/password.service");
const {
    deleteEducationInformation,
    deleteProject,
    deleteTraining,
    deleteWorkExperience,
    getBasicInformation,
    getCompleteInformation,
    getEducationInformation,
    getProjectInformation,
    getSkillInformation,
    getTrainingInformation,
    getUser,
    getWorkExperiences,
    registerUser,
    updateBasicInformation,
    updateEducationInformation,
    updateProjectInformation,
    updateSkillInformation,
    updateTrainingInformation,
    updateWorkExperiences
} = require("./user.model");
const config = require('../../../config/config');
const {getAvatarLink} = require('../../../services/cloudinary.service');
const checkWebsiteLink = require('../../../services/checkWebsiteLink.service');
const {checkEmail, checkPassword, checkPhoneNumber} = require("../../../config/helpers");

const {logger} = config;

exports.loginController = async (req, res, next) => {
    const {
        email,
        password,
        mode = config.tokenModes.normal
    } = req.body;

    if (!email || !password) {
        req.error = {
            status: 400,
            message: "Bad Request"
        };
        return next(new Error());
    }
    try {
        const response = await getUser(email, true);
        if (!response || (response && !await comparePassword(response.password, password))) {
            req.error = {
                status: 404,
                message: "User Not Found"
            };
            return next(new Error());
        }
        res.status(200).json(
            {
                status: "200",
                message: "successful",
                data: {
                    name: response.name,
                    email: response.email,
                    avatar: getAvatarLink(response.avatar.uploadId),
                    token: getToken({
                        userId: response._id,
                        email: response.email,
                        mode
                    })
                }
            }
        );
        logger.info(`[ user.controller.js ]User with email as ${response.email} has been logged in, with mode ${mode}`)
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(e);
    }
};

exports.registerController = async (req, res, next) => {
    const {
        name,
        email,
        contactNumber
    } = req.body;
    let {
        password
    } = req.body;

    if (!name || !email || !password || !contactNumber) {
        req.error = {
            status: 400,
            message: "Bad Request"
        };
        return next(new Error());
    }
    if (!checkEmail(email) || !checkPassword(password) || !checkPhoneNumber(contactNumber?.contactNumber)) {
        req.error = {
            status: 400,
            message: "Bad Request"
        };
        return next(new Error());
    }
    try {
        password = await encryptPassword(password);
        await registerUser({
            name,
            email,
            contactNumber,
            password
        });
        res.status(200).json({
            status: 200,
            message: "User registered successfully"
        });
        logger.info(`[ user.controller.js ] User register successfully with email as ${email}`);
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }

};

exports.getBasicInformationController = async (req, res, next) => {
    try {
        const basicInformation = await getBasicInformation(req.user.email);
        res.status(200).json({
            status: 200,
            message: "Basic information retrieved successfully",
            data: {
                basicInformation
            }
        });
        logger.info(`[ user.controller.js ] Basic information for the user having email as ${req.user.email} has been sent.`)
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.updateBasicInformationController = async (req, res, next) => {
    const {
        basicInformation,
        basicInformation: {
            website
        }
    } = req.body;
    /*if (objective > 200) {
        req.error = {
            status: 411,
            message: "Profile Objective should not be more than 200 characters"
        };
        next(new Error());
    }*/
    if (website && checkWebsiteLink(website)) {
        req.error = {
            status: 411,
            message: "Website link is not valid"
        };
        return next(new Error());
    }
    try {
        const updatedInformation = await updateBasicInformation(req.user.email, basicInformation);
        res.status(200).json(
            {
                status: 200,
                message: "Information successfully updated.",
                data: {
                    updatedInformation
                }
            }
        );
    } catch (e) {
        console.log("e", e);
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.updateEducationInformationController = async (req, res, next) => {
    try {
        const {
            educations: educationInformation
        } = req.body;
        /*for (let {isPercentage, isCGPA} of educationInformation) {
            if ((isPercentage && isCGPA) || (!isPercentage && !isCGPA)) {
                req.error = {
                    status: 400,
                    message: 'Out of percentage and CGPA only and at most one has to be true.'
                };
                next(new Error());
            }
        }*/
        let updated = await updateEducationInformation(req.user.email, educationInformation);
        res.status(200).json(
            {
                status: 200,
                message: "Information successfully updated.",
                data: [
                    ...updated
                ]
            }
        )
    } catch (e) {
        console.log("e", e);
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.getEducationInformationController = async (req, res, next) => {
    try {
        const {q} = req.query;
        const educationInformation = await getEducationInformation(req.user.email, q);
        res.status(200).json(
            {
                status: 200,
                message: "education information successfully retrieved.",
                data: {
                    educationInformation
                }
            }
        );
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.updateSkillInformationController = async (req, res, next) => {
    try {
        const {
            skills
        } = req.body;
        console.log("skills", skills);
        const updated = await updateSkillInformation(skills, req.user.email);
        res.status(200).json(
            {
                status: 200,
                message: "Skills updated successfully",
                data: {
                    ...updated
                }
            }
        )
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.getSkillInformationController = async (req, res, next) => {
    try {
        const {q} = req.query;
        const {skills} = await getSkillInformation(req.user.email, q);
        res.status(200).json(
            {
                status: 200,
                message: "data successfully retrieved",
                data: {skills}
            }
        )
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.updateWorkExperiencesController = async (req, res, next) => {
    try {
        const {workExperiences} = req.body;
        const updated = await updateWorkExperiences(workExperiences, req.user.email);
        res.status(200).json(
            {
                status: 200,
                message: "Work experiences successfully updated",
                data: [
                    ...updated
                ]
            }
        )
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.getWorkExperiencesController = async (req, res, next) => {
    try {
        const {q} = req.query;
        const workExperiences = await getWorkExperiences(req.user.email, q);
        res.status(200).json(
            {
                status: 200,
                message: "data successfully retrieved",
                data: {
                    workExperiences
                }
            }
        )
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.getProjectInformationController = async (req, res, next) => {
    try {
        const {q} = req.query;
        const projects = await getProjectInformation(req.user.email, q);
        res.status(200).json(
            {
                status: 200,
                message: "data successfully retrieved",
                data: {
                    projects
                }
            }
        )
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.updatedProjectInformationController = async (req, res, next) => {
    try {
        const {projects} = req.body;
        const updated = await updateProjectInformation(projects, req.user.email);
        res.status(200).json(
            {
                status: 200,
                message: "projects information successfully updated.",
                data: [
                    ...updated
                ]
            }
        );
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.deleteProjectInformationController = async (req, res, next) => {
    try {
        const {id: projectId} = req.body;
        if (!projectId) {
            req.error = {
                status: 400,
                message: 'Project Id is missing from the body.'
            };
            next(new Error());
        }
        const projects = await deleteProject(projectId, req.user.email);
        res.status(200).json(
            {
                status: 200,
                message: "delete successful",
                data: projects
            }
        );
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.deleteWorkExperienceController = async (req, res, next) => {
    try {
        const {id: workExperienceId} = req.body;
        if (!workExperienceId) {
            res.error = {
                status: 400,
                message: "work experience Id is required in the request body."
            };
            return next(new Error());
        }
        const workExperiences = await deleteWorkExperience(workExperienceId, req.user.email);
        res.status(200).json(
            {
                status: 200,
                message: "delete successful",
                data: workExperiences
            }
        )
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.deleteEducationInformationController = async (req, res, next) => {
    try {
        const {id: educationId} = req.body;
        if (!educationId) {
            req.error = {
                status: 400,
                message: "Education ID is required in request body."
            };
            return next(new Error());
        }
        const educations = await deleteEducationInformation(educationId, req.user.email);
        res.status(200).json(
            {
                status: 200,
                message: 'delete successful',
                data: educations

            }
        )
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.getCompleteInformationController = async (req, res, next) => {
    try {
        const information = await getCompleteInformation(req.user.email);
        res.status(200).json(
            {
                status: 200,
                message: "complete information retrieval successful",
                data: {
                    ...information
                }
            }
        )
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(e);
    }
};

exports.updatedTrainingInformationController = async (req, res, next) => {
    try {
        const {trainings} = req.body;
        const updated = await updateTrainingInformation(trainings, req.user.email);
        res.status(200).json(
            {
                status: 200,
                message: "Trainings information successfully updated.",
                data: [
                    ...updated
                ]
            }
        );
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
        ;
    }
};

exports.deleteTrainingInformationController = async (req, res, next) => {
    try {
        const {id: trainingId} = req.body;
        if (!trainingId) {
            req.error = {
                status: 400,
                message: 'Training Id is missing from the body.'
            };
            return next(new Error());
        }
        const trainings = await deleteTraining(trainingId, req.user.email);
        res.status(200).json(
            {
                status: 200,
                message: "delete successful",
                data: trainings
            }
        );
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.getTrainingInformationController = async (req, res, next) => {
    try {
        const {q} = req.query;
        const trainings = await getTrainingInformation(req.user.email, q);
        res.status(200).json(
            {
                status: 200,
                message: "data successfully retrieved",
                data: {
                    trainings
                }
            }
        )
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
};

exports.getProfessionalSummaryController = async (req, res, next) => {
    try {
        const professionalSummary = await getBasicInformation(req.user.email, {objective: 1})
        res.status(200).json({
            message: "Professional Summary successfully retrieved",
            data: {objective: professionalSummary?.objective}
        })
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
}
