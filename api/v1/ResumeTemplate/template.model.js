const mongoose = require("mongoose");
const TemplatesSchema = require("../../../schemas/resumeTemplates.schema");
const {Types} = require("mongoose");
const Template = mongoose.model("Template", TemplatesSchema)

exports.getTemplates = (user, projection) =>
    Template.find(
        {user},
        projection
    )

exports.addNewTemplate = (user, data) => {
    const newTemplate = new Template({user, ...data});
    return newTemplate.save();
}

exports.getTemplateDetails = (user, id) => Template.findOne(
    {user, _id: new Types.ObjectId(id)}
)

exports.updateTemplate = (email, templateId, update)  => Template.findOneAndUpdate(
    {user: email, _id: new Types.ObjectId(templateId)},
    update,
    {new: true}
)
