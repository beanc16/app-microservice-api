const envStrings = require("./envString");
const envsArray = require("./envsArray");
const searchNameStrings = require("./searchNameString");
const displayNameString = require("./displayNameString");
const dataObjs = require("./apps/dataObj");



module.exports = {
    ...envStrings,
    ...envsArray,
    ...searchNameStrings,
    ...displayNameString,
    ...dataObjs,
};
