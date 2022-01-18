const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../custom_modules/JoiHelpers");
const getAppSchemaHelpers = require("./getHelpers");
const appSchemas = require("./universalHelpers").appSchemas;



// Get apps - by id, env, or searchName
const getAppsSchema = JoiRequired.alternatives().try(
    // By id
    JoiRequired.object({
        id: appSchemas.idStringRequired,
        env: appSchemas.envString,
        searchName: appSchemas.searchName,
    }),

    // By env
    JoiRequired.object({
        id: appSchemas.idString,
        env: appSchemas.envStringRequired,
        searchName: appSchemas.searchName,
    }),

    // By searchName
    JoiRequired.object({
        id: appSchemas.idString,
        env: appSchemas.envString,
        searchName: appSchemas.searchNameStringRequired,
    }),
);



module.exports = {
    getAppsSchema,
};
