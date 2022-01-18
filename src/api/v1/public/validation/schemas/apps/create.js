const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../custom_modules/JoiHelpers");
const appSchemas = require("./helpers");



// Create app
const createAppSchema = JoiRequired.object({
    envs: appSchemas.envsArrayRequired,
    searchName: appSchemas.searchNameStringRequired,
    displayName: appSchemas.displayNameStringRequired,
    data: appSchemas.dataObj,
});



module.exports = {
    createAppSchema,
};
