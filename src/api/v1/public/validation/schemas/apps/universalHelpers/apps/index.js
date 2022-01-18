const envStrings = require("./envString");
const envsArray = require("./envsArray");
const searchNameStrings = require("./searchNameString");
const displayNameString = require("./displayNameString");
const dataObjs = require("./dataObj");
const ids = require("./id");



module.exports = {
    ...envStrings,
    ...envsArray,
    ...searchNameStrings,
    ...displayNameString,
    ...ids,
};
