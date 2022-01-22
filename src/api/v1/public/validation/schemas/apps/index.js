const getSchemas = require("./get");
const createSchemas = require("./create");
const updateSchemas = require("./update");
const deleteSchemas = require("./delete");



module.exports = {
    ...getSchemas,
    ...createSchemas,
    ...updateSchemas,
    ...deleteSchemas,
};
