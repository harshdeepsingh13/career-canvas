import {
    fetchProjectAPI,
    fetchSkillsAPI,
    fetchWorkExperiencesAPI,
    getProfessionalSummaryAPI
} from "../../services/axios";

export default (state, updateState, loaderSetters, pushToast) => {
    return ({
        fetchProfessionalSummary: async () => {
            try {
                loaderSetters.setFetchSummaryLoader(true);
                const {data: {data}} = await getProfessionalSummaryAPI();
                updateState({objective: data?.objective})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setFetchSummaryLoader(false)
            }
        },
        fetchSkills: async (q) => {
            try {
                loaderSetters.setSkillsAutofillLoader(true);
                const {data: {data}} = await fetchSkillsAPI(q);
                updateState({skillsAutofillItems: data.skills})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setSkillsAutofillLoader(false)
            }
        },
        fetchWorkExperiences: async (q) => {
            try {
                loaderSetters.setWorkExperienceAutofillLoader(true);
                const {data: {data}} = await fetchWorkExperiencesAPI(q);
                updateState({workExperienceAutofillItems: data.workExperiences})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setWorkExperienceAutofillLoader(false)
            }
        },
        fetchProjects: async (q) => {
            try {
                loaderSetters.setProjectAutofillLoader(true);
                const {data: {data}} = await fetchProjectAPI(q);
                updateState({projectAutofillItems: data.projects})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setProjectAutofillLoader(false)
            }
        },
        fetchResumeTemplates: async () => {
            try {
                loaderSetters.setFetchTemplatesLoader(true)
                const {data: {data}} = await fetchResumeTemplatesAPI();
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setFetchTemplatesLoader(false)
            }
        }
    })
}
