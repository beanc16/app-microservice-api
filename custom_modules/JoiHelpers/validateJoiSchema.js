async function validateJoiSchema({ schema, payload })
{
    return new Promise(function (resolve, reject)
    {
        const { value, error } = schema.validate(payload);

        if (error)
        {
            reject(error);
        }

        resolve(value);
    });
}



module.exports = validateJoiSchema;
