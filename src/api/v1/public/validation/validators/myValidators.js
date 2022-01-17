//const { mySchema } = require("../schemas");
const { validateJoiSchema } = require("../../../../../../custom_modules/JoiHelpers");



// LabelHere
function validateMyPayload(payload)
{
    return new Promise(function (resolve, reject)
    {
        validateJoiSchema(mySchema, payload)
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
    //validateMyPayload,
};