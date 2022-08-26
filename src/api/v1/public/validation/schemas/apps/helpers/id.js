const { JoiMongoDb } = require("@beanc16/joi-helpers");



// MongoDB ObjectIds are 24 characters long
const idString = JoiMongoDb.string().objectId();
const idStringRequired = idString.required();



module.exports = {
    idString,
    idStringRequired,
};
