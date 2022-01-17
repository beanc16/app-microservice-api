const Joi = require("joi");



const JoiRequired = Joi.defaults(function (schema)
{
    return schema.required();
});



module.exports = JoiRequired;
