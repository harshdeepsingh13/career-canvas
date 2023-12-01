import {generateCoverLetterAPI} from "../../services/axios";

export default (state, updateState, loaderSetters, pushToast, pushCoverLetterContent) => {
    return {
        generateCoverLetter: async (jobDescription) => {
            try {
                loaderSetters.setGenerateCoverLetterLoader(true);
                const {data} = await generateCoverLetterAPI(jobDescription, pushCoverLetterContent);
                // updateState({coverLetter: data})
            } catch (e) {
                console.log("e", e);
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setGenerateCoverLetterLoader(false)
            }
        }
    }
}
