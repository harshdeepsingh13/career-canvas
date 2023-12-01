const {CohereClient} = require("cohere-ai");
const cohere = new CohereClient({
    token: "uRurQa7mDOrscziPOLUMSuj03TKw9MxmcdhIBiu7",
});

exports.getCoverLetter = async (skills, workExperiences, jobDescription, res) => {
    res.write("");
    let message = "";
    if (skills.length) {
        message += "My Skills: " + skills + "\n";
    }
    if (workExperiences.length) {
        message += "my work experiences: " + workExperiences + "\n"
    }
    const stream = await cohere.chatStream({
        model: "command",
        message: message + "\n" + "Job Description: " + jobDescription + "\n I am applying for this job. Please create a cover letter for me in at least 1000 words. Only respond with cover letter nothing extra before or after it.\n",
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
