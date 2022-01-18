const Joi = require("joi");



// Lowercase, -, & _
const _searchNameRegex = /^[a-z\-_]+$/;

// Lowercase, -, & _
const searchNameString = Joi.string()
                            .pattern(_searchNameRegex)
                            .min(3)
                            .max(100);
const searchNameStringRequired = searchNameString.required();



module.exports = {
    searchNameString,
    searchNameStringRequired,
};
