const {CohereClient} = require("cohere-ai");
const {cohereAiToken} = require("../config/config");

const cohere = new CohereClient({
    token: cohereAiToken,
});

exports.getCoverLetter = async (skills, workExperiences, jobDescription, res) => {
    res.write("");
    let message = "";
    if (skills?.length) {
        message += "My Skills: " + skills + "\n";
    }
    if (workExperiences?.length) {
        message += "my work experiences: " + workExperiences + "\n"
    }
    const stream = await cohere.chatStream({
        model: "command",
        message: message + "\n" + "Job Description: " + jobDescription + "\n I am applying for this job. Using my skills and work experience information, please create a cover letter for me in at least 1000 words to apply for the job. Only respond with cover letter nothing extra before or after it.\n",
        promptTruncation: "AUTO",
        citationQuality: "accurate",
        connectors: [],
        documents: []
    });

    for await (const chat of stream) {
        if (chat.eventType === "text-generation") {
            res.write(chat.text.replace(/\n\s?/, "<br/>"))
        }
    }
    res.end();
}
