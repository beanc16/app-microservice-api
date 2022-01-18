const Joi = require("joi");



// Lowercase, -, & _
const searchNameString = Joi.string()
                            .pattern(/^[a-z-_]+$/)
                            .min(3)
                            .max(100);
const searchNameStringRequired = searchNameString.required();



module.exports = {
    searchNameString,
    searchNameStringRequired,
};
