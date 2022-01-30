const { deleteAppsSchema } = require("../../schemas");
const { validateJoiSchema } = require("@beanc16/joi-helpers");



function validateDeleteAppPayload(payload)
{
    return new Promise(function (resolve, reject)
    {
        validateJoiSchema(deleteAppsSchema, payload)
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
    validateDeleteAppPayload,
};
