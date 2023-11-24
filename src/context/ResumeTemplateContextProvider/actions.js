import {
    addNewResumeTemplateAPI,
    downloadResumePdfAPI,
    fetchCertificatesAPI,
    fetchEducationDetailsAPI,
    fetchPdfViewAPI,
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
        addResumeTemplate: async (templateName, successCallback) => {
            try {
                loaderSetters.setAddTemplateLoader(true);
                await addNewResumeTemplateAPI({templateName});
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
        updateTemplate: async (templateId, data, successCallback) => {
            try {
                loaderSetters.setUpdateTemplateLoader(true);
                const {data: {data: responseData}} = await updateTemplateAPI(templateId, data);
                pushToast({text: "Template updated successfully", variant: "success"})
                successCallback && successCallback();
                updateState({templateDetails: responseData.updated})
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setUpdateTemplateLoader(false)
            }
        },
        fetchPdfView: async (selectedResumeTemplateId, templateViewId = 1, themeColor) => {
            try {
                loaderSetters.setFetchPdfViewLoader(true);
                await fetchPdfViewAPI(selectedResumeTemplateId, templateViewId, themeColor)
                // const file = new Blob(data, {type: "application/pdf"})
                // updateState({pdfViewFile: file})
            } catch (e) {
                console.log("e", e);
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setFetchPdfViewLoader(false)
            }
        },
        downloadResumePdf: async (selectedResumeTemplateId, templateViewId = 1, themeColor) => {
            try {
                loaderSetters.setDownloadResumePdfLoader(true);
                const {data: blob} = await downloadResumePdfAPI(selectedResumeTemplateId, templateViewId, themeColor)
                const blobUrl = window.URL.createObjectURL(blob);
                const anchor = window.document.createElement('a');
                anchor.download = "Resume.pdf";
                anchor.href = blobUrl;
                anchor.click();
                window.URL.revokeObjectURL(blobUrl);
            } catch (e) {
                console.log("e", e);
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setDownloadResumePdfLoader(false);
            }
        }
    })
}
