const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../../custom_modules/JoiHelpers");
const { envsEnum } = require("../../../../../../../js/enums");
const getByEnv = require("./getByEnv");
const getBySearchName = require("./getBySearchName");



const getByEnvOrSearchNameSchema = JoiRequired.alternatives().try(
    getBySearchName,
    getByEnv,
);



module.exports = getByEnvOrSearchNameSchema;
