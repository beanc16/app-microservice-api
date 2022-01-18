const Joi = require("joi");
const { envsEnum } = require("../../../../../../../js/enums");



const envString = Joi.string().valid(...envsEnum.envs);
const envStringRequired = envString.required();



module.exports = {
    envString,
    envStringRequired,
};
