import {
    addNewResumeTemplateAPI,
    fetchCertificatesAPI,
    fetchEducationDetailsAPI,
    fetchProjectAPI,
    fetchResumeTemplatesAPI,
    fetchSkillsAPI,
    fetchTemplateDetailsAPI,
    fetchWorkExperiencesAPI,
    getProfessionalSummaryAPI,
    updateTemplateAPI
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
                updateState({templates: data.templates})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setFetchTemplatesLoader(false)
            }
        },
        addResumeTemplate: async (successCallback) => {
            try {
                loaderSetters.setAddTemplateLoader(true);
                await addNewResumeTemplateAPI();
                successCallback && successCallback();
                pushToast({text: "Resume Template added successfully", variant: "success"})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setAddTemplateLoader(false)
            }
        },
        fetchTemplateDetails: async (templateId, successCallback) => {
            try {
                loaderSetters.setFetchTemplateDetailsLoader(true)
                const {data: {data}} = await fetchTemplateDetailsAPI(templateId);
                successCallback && successCallback(data.details)
                updateState({templateDetails: data.details})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setFetchTemplateDetailsLoader(false)
            }
        },
        fetchEducationDetails: async (q) => {
            try {
                loaderSetters.setEducationAutofillLoader(true);
                const {data: {data}} = await fetchEducationDetailsAPI(q);
                updateState({educationAutofillItems: data.educationInformation?.educationInformation?.educations})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setEducationAutofillLoader(false)
            }
        },
        fetchCertificates: async q => {
            try {
                loaderSetters.setCertificateAutofillLoader(true);
                const {data: {data}} = await fetchCertificatesAPI(q);
                updateState({certificateAutofillItems: data.trainings})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setCertificateAutofillLoader(false)
            }
        },
        updateTemplate: async (templateId, data) => {
            try {
                loaderSetters.setUpdateTemplateLoader(true);
                const {data: {data: responseData}} = await updateTemplateAPI(templateId, data);
                pushToast({text: "Template updated successfully", variant: "success"})
                updateState({templateDetails: responseData.updated})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setUpdateTemplateLoader(false)
            }
        }
    })
}
