const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../../custom_modules/JoiHelpers");
const { envsEnum } = require("../../../../../../../js/enums");
const getByEnv = require("./getByEnv");
const getBySearchName = require("./getBySearchName");



const getByEnvOrSearchNameSchema = JoiRequired.alternatives().try(
    getBySearchName,
    getByEnv,
    JoiRequired.object({
        env: Joi.string().allow(...envsEnum.envs),
        searchName: JoiRequired.string(),
    }),
    JoiRequired.object({
        env: JoiRequired.string().allow(...envsEnum.envs),
        searchName: Joi.string(),
    }),
);



module.exports = getByEnvOrSearchNameSchema;
