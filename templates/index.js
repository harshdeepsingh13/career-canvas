const templateOne = require('./templateOne');

const templates = [
    {id: 1, generator: templateOne.generator}
]

exports.getTemplateById = id => templates.find(t => +t.id === +id);
