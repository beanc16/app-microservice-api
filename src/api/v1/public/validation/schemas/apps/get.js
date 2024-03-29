const { JoiRequired } = require("@beanc16/joi-helpers");
const appSchemas = require("./helpers");



// Get apps - by id, env, or searchName
const getAppsSchema = JoiRequired.alternatives().try(
    // By id
    JoiRequired.object({
        id: appSchemas.idStringRequired,
        env: appSchemas.envString,
        searchName: appSchemas.searchNameString,
    }),

    // By env
    JoiRequired.object({
        id: appSchemas.idString,
        env: appSchemas.envStringRequired,
        searchName: appSchemas.searchNameString,
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
