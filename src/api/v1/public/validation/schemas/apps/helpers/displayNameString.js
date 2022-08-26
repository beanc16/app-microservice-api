const Joi = require("joi");



// \w = [A-Za-z0-9_]
const _displayNameRegex = /^[\w\-!@#$%^&*()+=,.<>?/:;"'{}[\]|\\`~ ]+$/;

const displayNameString = Joi.string()
                            .pattern(_displayNameRegex)
                            .min(3)
                            .max(100);
const displayNameStringRequired = displayNameString.required();



module.exports = {
    displayNameString,
    displayNameStringRequired,
};
