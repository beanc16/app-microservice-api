const MongoController = require("../../../custom_modules/MongoDbController");
const { App } = require("../models/index");



class AppController extends MongoController
{
    static collectionName = process.env.COLLECTION_APPS;
    static Model = App;
}



module.exports = AppController;
