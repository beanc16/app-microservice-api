const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../../custom_modules/JoiHelpers");
const { envsEnum } = require("../../../../../../../js/enums");



const getByIdSchema = JoiRequired.object({
    id: JoiRequired.string(),
    env: Joi.string().allow(...envsEnum.envs),
    searchName: Joi.string(),
});



module.exports = getByIdSchema;
