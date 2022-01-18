const ids = require("./id");
const envStrings = require("./envString");
const envsArray = require("./envsArray");
const searchNameStrings = require("./searchNameString");
const displayNameString = require("./displayNameString");
const dataObjs = require("./dataObj");



module.exports = {
    ...ids,
    ...envStrings,
    ...envsArray,
    ...searchNameStrings,
    ...displayNameString,
    ...dataObjs,
};
