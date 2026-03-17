const mongoose = require("mongoose");
const TemplatesSchema = require("../../../schemas/resumeTemplates.schema");
const {Types} = require("mongoose");
const {sanitizeDocument} = require("../../../config/helpers");
const Template = mongoose.model("Template", TemplatesSchema)

exports.getTemplates = (user, projection) =>
    Template.find(
        {user},
        projection
    )

exports.addNewTemplate = (user, data) => {
    const newTemplate = new Template({user, ...sanitizeDocument(data)});
    return newTemplate.save();
}

exports.getTemplateDetails = (user, id) => Template.findOne(
    {user, _id: new Types.ObjectId(id)}
)

exports.updateTemplate = (email, templateId, update) => Template.findOneAndUpdate(
    {user: email, _id: new Types.ObjectId(templateId)},
    {$set: sanitizeDocument(update)},
    {new: true}
)
