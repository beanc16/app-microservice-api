const { JoiRequired } = require("@beanc16/joi-helpers");
const appSchemas = require("./helpers");



// Old version of app before update
const _oldUpdateAppSchema = JoiRequired.alternatives().try(
    // Update by ID
    JoiRequired.object({
        id: appSchemas.idStringRequired,
        searchName: appSchemas.searchNameString,
    }),

    // Update by searchName
    JoiRequired.object({
        id: appSchemas.idString,
        searchName: appSchemas.searchNameStringRequired,
    }),
);

// New version of app after update
const _newUpdateAppSchema = JoiRequired.alternatives().try(
    // Update envs
    JoiRequired.object({
        envs: appSchemas.envsArrayRequired,
        searchName: appSchemas.searchNameString,
        displayName: appSchemas.displayNameString,
        data: appSchemas.dataObj,
    }),

    // Update searchName
    JoiRequired.object({
        envs: appSchemas.envsArray,
        searchName: appSchemas.searchNameStringRequired,
        displayName: appSchemas.displayNameString,
        data: appSchemas.dataObj,
    }),

    // Update displayName
    JoiRequired.object({
        envs: appSchemas.envsArray,
        searchName: appSchemas.searchNameString,
        displayName: appSchemas.displayNameStringRequired,
        data: appSchemas.dataObj,
    }),

    // Update data
    JoiRequired.object({
        envs: appSchemas.envsArray,
        searchName: appSchemas.searchNameString,
        displayName: appSchemas.displayNameString,
        data: appSchemas.dataObjRequired,
    }),
);

// Update app
const updateAppSchema = JoiRequired.object({
    old: _oldUpdateAppSchema,
    new: _newUpdateAppSchema,
});



module.exports = {
    updateAppSchema,
};
