const {getCoverLetter} = require("../../../services/CohereAI.service");
const {getSkillInformation, getWorkExperiences} = require("../User/user.model");

const MAX_JOB_DESCRIPTION_LENGTH = 5000;

exports.generateCoverLetterController = async (req, res, next) => {
    try {
        const {jobDescription} = req.body;

        if (typeof jobDescription !== "string" || jobDescription.trim().length === 0) {
            req.error = {status: 400, message: "jobDescription is required."};
            return next(new Error());
        }

        const safeJobDescription = jobDescription.slice(0, MAX_JOB_DESCRIPTION_LENGTH);

        const {email} = req.user;
        const skills = await getSkillInformation(email);
        const workExperience = await getWorkExperiences(email);
        await getCoverLetter(skills?.skills, workExperience, safeJobDescription, res)

    } catch (e) {
        console.log("Error in generateCoverLetterController:", e);
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
}
