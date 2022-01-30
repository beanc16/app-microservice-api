const { getAppsSchema } = require("../../schemas");
const { validateJoiSchema } = require("@beanc16/joi-helpers");



function validateGetAppsPayload(payload)
{
    return new Promise(function (resolve, reject)
    {
        validateJoiSchema(getAppsSchema, payload)
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
    validateGetAppsPayload,
};
