const { deleteAppsSchema } = require("../../schemas");
const { validateJoiSchema } = require("../../../../../../../custom_modules/JoiHelpers");



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
