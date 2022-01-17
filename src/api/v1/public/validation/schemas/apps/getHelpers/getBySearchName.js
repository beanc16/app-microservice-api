const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../../custom_modules/JoiHelpers");
const { envsEnum } = require("../../../../../../../js/enums");



const getBySearchName = JoiRequired.object({
    env: Joi.string().allow(...envsEnum.envs),
    searchName: JoiRequired.string(),
});



module.exports = getBySearchName;
