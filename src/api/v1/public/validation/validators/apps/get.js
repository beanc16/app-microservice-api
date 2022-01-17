const { getAppsSchema } = require("../../schemas");
const { validateJoiSchema } = require("../../../../../../../custom_modules/JoiHelpers");



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
