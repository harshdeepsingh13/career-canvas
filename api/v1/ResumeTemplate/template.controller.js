const {getTemplates, addNewTemplate, getTemplateDetails, updateTemplate} = require("./template.model");
const {getBasicInformation} = require("../User/user.model");

exports.getTemplatesController = async (req, res, next) => {
    try {
        const templates = await getTemplates(req.user.email, {templateName: 1})
        res.status(200).json({message: "Templates Fetched Successfully", data: {templates}})
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
}

exports.addNewTemplateController = async (req, res, next) => {
    try {
        const data = req.body;
        const {email} = req.user;
        if (!data?.objective) {
            const {objective} = await getBasicInformation(email, {objective: 1})
            data.objective = objective;
        }
        const template = await addNewTemplate(email, data)
        res.status(200).json({message: "Template Saved Successfully", data: {template: template._doc}})
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
}

exports.getTemplateDetailsController = async (req, res, next) => {
    try {
        const {email} = req.user;
        const {id: templateId} = req.params;
        const templateDetails = await getTemplateDetails(email, templateId)
        res.status(200).json({message: "Fetched template details", data: {details: templateDetails}})
    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
}

exports.updateTemplateController = async (req, res, next) => {
    try {
        const {id: templateId} = req.params;
        const templateUpdateData = req.body;
        const {email} = req.user;
        const updatedTemplate = await updateTemplate(email, templateId, templateUpdateData)
        res.status(200).json({message: "Template updated successfully", data: {updated: updatedTemplate}})

    } catch (e) {
        req.error = {status: 500, message: "An Error occurred!"}
        return next(new Error());
    }
}
