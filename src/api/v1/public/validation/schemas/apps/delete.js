const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../custom_modules/JoiHelpers");
const appSchemas = require("./helpers");



// Delete apps - by id, env, or searchName
const deleteAppsSchema = JoiRequired.alternatives().try(
    // By id
    JoiRequired.object({
        id: appSchemas.idStringRequired,
        searchName: appSchemas.searchNameString,
    }),

    // By searchName
    JoiRequired.object({
        id: appSchemas.idString,
        searchName: appSchemas.searchNameStringRequired,
    }),
);



module.exports = {
    deleteAppsSchema,
};