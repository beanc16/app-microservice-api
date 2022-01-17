const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../../custom_modules/JoiHelpers");



const getBySearchName = JoiRequired.object({
    searchName: JoiRequired.string(),
});



module.exports = getBySearchName;
