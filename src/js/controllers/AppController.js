const { MongoDbControllerWithEnv } = require("mongodb-controller");
const { App } = require("../models");



class AppController extends MongoDbControllerWithEnv
{
    static collectionName = process.env.COLLECTION_APPS;
    static Model = App;
}



module.exports = AppController;
