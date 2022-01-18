const Joi = require("joi");



// MongoDB ObjectIds are 24 characters long
const idString = Joi.string().length(24);
const idStringRequired = idString.required();



module.exports = {
    idString,
    idStringRequired,
};
