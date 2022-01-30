const { createAppSchema } = require("../../schemas");
const { validateJoiSchema } = require("@beanc16/joi-helpers");



function validateCreateAppPayload(payload)
{
    return new Promise(function (resolve, reject)
    {
        validateJoiSchema(createAppSchema, payload)
            .then(function (value)
            {
                resolve(value);
            })
            .catch(function (error)
            {
                reject(error);
            });
    });
}



module.exports = {
    validateCreateAppPayload,
};
