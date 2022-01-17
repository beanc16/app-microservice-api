const Joi = require("joi");
const { JoiRequired } = require("../../../../../../../custom_modules/JoiHelpers");
const {
    envsEnum,
    joiSchemaSettingsEnum,
} = require("../../../../../../js/enums");
const dataSettings = joiSchemaSettingsEnum.apps.data;

// Create app
/*
const createAppSchema = JoiRequired.object({
    env: JoiRequired.string().allow(...envsEnum.envs),
    searchName: JoiRequired.string(),
    displayName: JoiRequired.string(),
    data: Joi.object()
             .max(dataSettings.maxNumOfKeys)
             .pattern(
                Joi.string().max(dataSettings.maxKeyLength),  // Keys
                Joi.alternatives().try(                       // Values
                    Joi.string().max(dataSettings.maxDataValue.string),
                    Joi.number().max(dataSettings.maxDataValue.number),
                    Joi.boolean(),
                    Joi.date(),
                ),
             ),
});
*/



module.exports = {
    //createAppSchema,
};