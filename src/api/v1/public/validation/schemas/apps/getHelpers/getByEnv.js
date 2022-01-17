const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../../custom_modules/JoiHelpers");
const { envsEnum } = require("../../../../../../../js/enums");



const getByEnvSchema = JoiRequired.object({
    env: JoiRequired.string().allow(...envsEnum.envs),
});



module.exports = getByEnvSchema;
