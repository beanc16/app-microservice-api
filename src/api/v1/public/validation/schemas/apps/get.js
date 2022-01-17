const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../custom_modules/JoiHelpers");
const appSchemas = require("./getHelpers");




// Get many apps
const getAppsSchema = appSchemas.getByEnvOrSearchName;

// Get one app
const getAppSchema = JoiRequired.alternatives().try(
    appSchemas.getByEnvAndSearchName,
    appSchemas.getById,
);



module.exports = {
    getAppsSchema,
    getAppSchema,
};