const mongoose = require("mongoose");
const UserSchema = require('../../../schemas/user.schema');
const EducationsSchema = require("../../../schemas/educations.schema");
const WorkExperienceSchema = require("../../../schemas/workExperience.schema");
const ProjectSchema = require("../../../schemas/project.schema");
const TrainingSchema = require('../../../schemas/trainings.schema');
const SkillSchema = require("../../../schemas/skill.schema")

const basicInformationProjection = {
    _id: 0,
    name: 1,
    tags: 1,
    objective: 1,
    avatar: 1,
    email: 1,
    contactNumber: 1,
    currentLocation: 1,
    dob: 1,
    website: 1,
    socialMediaLinks: 1
};
const userInformationProjection = {
    _id: 0,
    name: 1,
    email: 1,
    avatar: 1
};
const educationInformationProjection = {
    _id: 0,
    educationInformation: 1
};
const skillInformationProjection = {
    _id: 0,
    skills: 1
};
const workExperienceProjection = {
    _id: 0,
    workExperienceInformation: 1
};
const projectsProjection = {
    _id: 0,
    projectsInformation: 1
};
const trainingsProjection = {
    _id: 0,
    trainingInformation: 1
};

const User = mongoose.model("User", UserSchema);
const WorkExperience = mongoose.model("WorkExperience", WorkExperienceSchema);
const EducationDetail = mongoose.model("EducationDetail", EducationsSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Training = mongoose.model("Training", TrainingSchema);
const Skill = mongoose.model("Skill", SkillSchema)

exports.registerUser = user => {
    const newUser = new User({...user});
    return newUser.save();
};

exports.getUser = (email, wantPassword = false) => {
    const projectionObject = {...userInformationProjection};

    if (wantPassword) projectionObject.password = 1;

    return User.findOne(
        {
            email
        },
        projectionObject
    );
};

exports.getBasicInformation = (email, projection = basicInformationProjection) =>
    User.findOne(
        {email},
        projection
    );

exports.updateBasicInformation = (userEmail, basicInformation) => {
    const {
        name,
        socialMediaLinks,
        email,
        avatar,
        contactNumber,
        dob,
        objective,
        currentLocation,
        tags,
        website
    } = basicInformation;
    return User.findOneAndUpdate(
        {email: userEmail},
        {
            name,
            avatar: {
                uploadId: avatar.uploadId
            },
            contactNumber,
            dob,
            objective,
            currentLocation,
            tags,
            website,
            socialMediaLinks
        },
        {
            new: true,
            fields: {...basicInformationProjection}
        }
    )
};

exports.updateEducationInformation = async (email, educationInformation) => {
    const updated = [];
    educationInformation = educationInformation.map(education => {
        if (education.type === 'postGraduation') education.priority = 0;
        if (education.type === 'graduation') education.priority = 1;
        if (education.type === 'seniorSecondary') education.priority = 2;
        if (education.type === 'secondary') education.priority = 3;
        if (!education._id) education._id = new mongoose.Types.ObjectId();
        return education
    });

    for (let education of educationInformation) {
        const updatedRecord = await EducationDetail.findOneAndUpdate(
            {user: email, _id: education._id},
            {...education},
            {upsert: true, new: true}
        );
        updated.push(updatedRecord);
    }
    return updated;
};

exports.getEducationInformation = async (email, q) => {
    let filter = {user: email};
    if (q) filter.instituteName = {$regex: "^" + q, $options: "i"}
    const educationInformation = await EducationDetail.find(
        filter,
        {},
        {
            sort: {priority: 1}
        }
    );
    return {educationInformation: {educations: [...educationInformation]}};
};

exports.updateSkillInformation = (skills, email) =>
    Skill.findOneAndUpdate(
        {user: email},
        {skills},
        {new: true, upsert: true}
    )

exports.getSkillInformation = async (email, q) => {
    if (q) {
        return (await Skill.aggregate([
            {$match: {user: email}},
            {
                $set: {
                    skills: {
                        $filter: {
                            input: "$skills",
                            as: "skill",
                            cond: {
                                $regexMatch: {
                                    input: "$$skill",
                                    regex: new RegExp("^" + q),
                                    options: "i"
                                }
                            }
                        }
                    }
                }
            },
            {$project: skillInformationProjection}
        ]))[0]
    }
    return Skill.findOne({user: email}, skillInformationProjection);
}

exports.updateWorkExperiences = async (workExperiences, email) => {
    const updated = [];

    for (let workExperience of workExperiences) {
        if (!workExperience._id) workExperience._id = new mongoose.Types.ObjectId();
        const updatedRecord = await WorkExperience.findOneAndUpdate(
            {
                user: email,
                _id: workExperience._id
            },
            {
                ...workExperience,
            },
            {
                new: true,
                upsert: true,

            }
        );
        updated.push(updatedRecord);
    }
    return updated;
};

exports.getWorkExperiences = (email, q) => {
    let filter = {user: email};
    if (q) filter.company = {$regex: "^" + q, $options: "i"}
    return WorkExperience.find(
        filter,
        {},
        {
            sort: {startDate: -1}
        }
    );
};


exports.getProjectInformation = (email, q) => {
    let filter = {user: email};
    if (q) filter.name = {$regex: "^" + q, $options: "i"}
    return Project.find(
        filter,
        {},
        {
            sort: {startDate: -1}
        }
    );
};

exports.updateProjectInformation = async (projects, email) => {
    const updated = [];

    for (let project of projects) {
        if (!project._id) project._id = new mongoose.Types.ObjectId();
        const updatedRecord = await Project.findOneAndUpdate(
            {
                user: email,
                _id: project._id
            },
            {
                ...project
            },
            {
                new: true,
                upsert: true
            }
        );
        updated.push(updatedRecord);
    }
    return updated;
};

exports.getTrainingInformation = (email, q) => {
    let filter = {user: email};
    if (q) filter.name = {$regex: "^" + q, $options: "i"}
    return Training.find(
        filter,
        {},
        {
            sort: {startDate: -1}
        }
    );
};

exports.updateTrainingInformation = async (trainings, email) => {
    const updated = [];

    for (let training of trainings) {
        if (!training._id) training._id = new mongoose.Types.ObjectId();
        const updatedRecord = await Training.findOneAndUpdate(
            {
                user: email,
                _id: training._id
            },
            {
                ...training
            },
            {
                new: true,
                upsert: true
            }
        );
        updated.push(updatedRecord);
    }
    return updated;
};

exports.deleteTraining = (trainingId, email) =>
    Training.findOneAndDelete(
        {
            user: email,
            _id: trainingId
        },
        {}
    );


exports.deleteProject = (projectId, email) =>
    Project.findOneAndDelete(
        {
            user: email,
            _id: projectId
        },
        {}
    );

exports.deleteWorkExperience = (workExperienceId, email) =>
    WorkExperience.findOneAndDelete(
        {
            user: email,
            _id: workExperienceId
        },
        {}
    );

exports.deleteEducationInformation = (educationId, email) =>
    EducationDetail.findOneAndDelete(
        {
            _id: educationId,
            user: email
        },
        {}
    );

exports.getCompleteInformation = async email => ({
    basicInformation: await this.getBasicInformation(email),
    educationInformation: await this.getEducationInformation(email),
    skillsInformation: await this.getSkillInformation(email),
    workExperienceInformation: {workExperienceInformation: {workExperiences: await this.getWorkExperiences(email)}},
    trainingInformation: {trainingInformation: {trainings: await this.getTrainingInformation(email)}},
    projects: {projectsInformation: {projects: await this.getProjectInformation(email)}}
});
