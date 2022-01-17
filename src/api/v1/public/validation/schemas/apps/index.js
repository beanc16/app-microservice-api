const getSchemas = require("./get");
const createSchemas = require("./create");



module.exports = {
    ...getSchemas,
    ...createSchemas,
};
