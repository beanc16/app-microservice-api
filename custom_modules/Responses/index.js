const Response = require("./Response");
const response200s = require("./200s");
const response400s = require("./400s");
const response500s = require("./500s");



module.exports = {
    Response,
    ...response200s,
    ...response400s,
    ...response500s,
};
