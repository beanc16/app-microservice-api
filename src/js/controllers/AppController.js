const { MongoDbControllerWithEnv } = require("mongodb-controller");
const { App } = require("../models");
const { logger } = require("@beanc16/logger");



class AppController extends MongoDbControllerWithEnv
{
    static collectionName = process.env.COLLECTION_APPS;
    static Model = App;
    static logger = logger;
}



module.exports = AppController;
