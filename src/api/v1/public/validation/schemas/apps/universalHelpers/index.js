const envStrings = require("./envString");
const envsArray = require("./envsArray");
const searchNameStrings = require("./searchNameString");



module.exports = {
    ...envStrings,
    ...envsArray,
    ...searchNameStrings,
};
