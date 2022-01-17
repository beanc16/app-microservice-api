const joiSchemaSettingsEnum = {
    "apps": {
        "data": {
            "maxNumOfKeys": 100,
            "maxKeyLength": 100,
            "maxDataValue": {
                "string": 500,
                "number": 999999999999999999999999999999,
            },
        }
    },
};

Object.freeze(joiSchemaSettingsEnum);



module.exports = joiSchemaSettingsEnum;
