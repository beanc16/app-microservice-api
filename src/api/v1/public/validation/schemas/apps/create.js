const { JoiRequired } = require("@beanc16/joi-helpers");
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
