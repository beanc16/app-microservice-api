const getValidators = require("./get");
const createValidators = require("./create");



module.exports = {
    ...getValidators,
    ...createValidators,
};
