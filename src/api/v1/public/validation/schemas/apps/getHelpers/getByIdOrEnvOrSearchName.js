const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../../custom_modules/JoiHelpers");
const getById = require("./getById");
const getByEnvOrSearchName = require("./getByEnvOrSearchName");



const getByIdOrEnvOrSearchNameSchema = JoiRequired.alternatives().try(
    getById,
    getByEnvOrSearchName,
);



module.exports = getByIdOrEnvOrSearchNameSchema;
