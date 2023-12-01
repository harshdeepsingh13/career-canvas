const {getCoverLetter} = require("../../../services/CohereAI.service");
const {getSkillInformation, getWorkExperiences} = require("../User/user.model");

exports.generateCoverLetterController = async (req, res, next) => {
    try {
        const {jobDescription = ""} = req.body;
        const {email} = req.user;
        const skills = await getSkillInformation(email);
        const workExperience = await getWorkExperiences(email);
        await getCoverLetter(skills?.skills, workExperience, jobDescription, res)

    } catch (e) {
        console.log("e", e);
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
}
