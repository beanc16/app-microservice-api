const { getAppsSchema, getAppSchema } = require("../../schemas");
const { validateJoiSchema } = require("../../../../../../../custom_modules/JoiHelpers");



// Get many apps
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

// Get one app
function validateGetAppPayload(payload)
{
    return new Promise(function (resolve, reject)
    {
        validateJoiSchema(getAppSchema, payload)
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
    validateGetAppPayload,
};