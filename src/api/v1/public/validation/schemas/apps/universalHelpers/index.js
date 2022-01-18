const envStrings = require("./envString");
const envsArray = require("./envsArray");
const searchNameStrings = require("./searchNameString");
const displayNameString = require("./displayNameString");



module.exports = {
    ...envStrings,
    ...envsArray,
    ...searchNameStrings,
    ...displayNameString,
};
