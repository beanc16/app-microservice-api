// Mongo
const MongoConnection = require("./MongoConnection");
const MongoControllerHelpers = require("./MongoControllerHelpers");



class MongoController
{
    // Static variables
    static mongoUri;
    static dbName;
    static collectionName;
    static sortOptions = {};
    static Model;
    static _connection = new MongoConnection({
        dbName: this.dbName,
        uri: this.mongoUri,
    });



    /* 
     * GETS
     */

    static async getAll(findParams = { env: process.env.STAGE })
    {
        return new Promise(async (resolve, reject) =>
        {
            await MongoControllerHelpers.validateStaticVariables({
                collectionName: this.collectionName,
                Model: this.Model,
                controllerName: this.name,
            })
            .catch(function (errors)
            {
                reject(errors);
            });

            console.info("Querying resources from database...");

            MongoControllerHelpers.queryResources({
                connection: this._connection,
                findParams,
                collectionName: this.collectionName,
                sortOptions: this.sortOptions,
                Model: this.Model,
            })
            .then(function (mongoResults)
            {
                console.info("Successfully queried resources from database.");
                resolve(mongoResults);
            })
            .catch(function (errResults)
            {
                console.error("Failed to query resources from database:", errResults);
                reject(errResults);
            });
        });
    }

    static async getMostRecent(findParams = { env: process.env.STAGE })
    {
        return new Promise(async (resolve, reject) =>
        {
            await MongoControllerHelpers.validateStaticVariables({
                collectionName: this.collectionName,
                Model: this.Model,
                controllerName: this.name,
            })
            .catch(function (errors)
            {
                reject(errors);
            });

            MongoControllerHelpers.queryResource({
                connection: this._connection,
                findParams,
                collectionName: this.collectionName,
                Model: this.Model,
            })
            .then((mongoResults) =>
            {
                if (mongoResults && mongoResults.results)
                {
                    console.info("Successfully queried resources from database.");
                    resolve(mongoResults.results);
                }

                else
                {
                    console.error(
                        "Successfully queried resources from " + 
                        "database, but an unknown error " + 
                        "occurred while parsing the results."
                    );

                    reject(`An unknown error occurred in ` + 
                           `${this.name}.getMostRecent()`);
                }
            })
            .catch(function (errResults)
            {
                console.error("Failed to query resources from database:", errResults);
                resolve(errResults);
            });
        });
    }



    /* 
     * POSTS
     */

    static async insertOne(obj)
    {
        return new Promise(async (resolve, reject) =>
        {
            await MongoControllerHelpers.validateStaticVariables({
                collectionName: this.collectionName,
                Model: this.Model,
                controllerName: this.name,
            })
            .catch(function (errors)
            {
                reject(errors);
            });

            console.info(`Inserting one ${this.Model.name} into database...`);

            MongoControllerHelpers.insertOne({
                connection: this._connection,
                obj,
                collectionName: this.collectionName,
                Model: this.Model,
            })
            .then((model) =>
            {
                console.info(`Successfully inserted one ${this.Model.name} into database.`);
                resolve(model);
            })
            .catch((errResults) =>
            {
                console.error(`Failed to insert one ${this.Model.name} into database.`, errResults);
                reject(errResults);
            });
        });
    }
}





module.exports = MongoController;
