const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../../custom_modules/JoiHelpers");
const { envsEnum } = require("../../../../../../../js/enums");



const getByEnvAndSearchNameSchema = JoiRequired.object({
    env: JoiRequired.string().allow(...envsEnum.envs),
    searchName: JoiRequired.string(),
});



module.exports = getByEnvAndSearchNameSchema;