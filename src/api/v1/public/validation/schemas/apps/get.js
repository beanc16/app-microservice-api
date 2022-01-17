const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../custom_modules/JoiHelpers");
const getAppSchemaHelpers = require("./getHelpers");




const getAppsSchema = getAppSchemaHelpers.getByIdOrEnvOrSearchName;



module.exports = {
    getAppsSchema,
};