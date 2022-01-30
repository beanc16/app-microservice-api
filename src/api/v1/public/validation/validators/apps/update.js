const { updateAppSchema } = require("../../schemas");
const { validateJoiSchema } = require("@beanc16/joi-helpers");



function validateUpdateAppPayload(payload)
{
    return new Promise(function (resolve, reject)
    {
        validateJoiSchema(updateAppSchema, payload)
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
    validateUpdateAppPayload,
};
