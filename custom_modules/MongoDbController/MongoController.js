// Mongo
const MongoConnection = require("./MongoConnection");
const MongoResults = require("./MongoResults");


// Models
const {
    CollectionNameNotSetError,
    ModelNotSetError,
    ModelIsInvalidError,
} = require("./errors");



class MongoController
{
    // Static variables
    static mongoUri;
    static dbName;
    static collectionName;
    static sortOptions = {};
    static Model;
    static #connection = new MongoConnection({
        dbName: this.dbName,
        uri: this.mongoUri,
    });

	/* 
	 * GETS
	 */

	static async getAll(findParams = { env: process.env.STAGE })
	{
		return new Promise(async function (resolve, reject)
		{
            await MongoControllerHelpers.validateStaticVariables({
                collectionName: this.collectionName,
                Model: this.Model,
                controllerName: this.constructor.name,
            })
            .catch(function (errors)
            {
                reject(errors);
            });

			console.info("Querying resources from database...");

			MongoControllerHelpers.queryResources({
                connection: this.#connection,
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
		return new Promise(async function (resolve, reject)
		{
            await MongoControllerHelpers.validateStaticVariables({
                collectionName: this.collectionName,
                Model: this.Model,
                controllerName: this.constructor.name,
            })
            .catch(function (errors)
            {
                reject(errors);
            });

			MongoControllerHelpers.queryResource({
                connection: this.#connection,
                findParams,
                collectionName: this.collectionName,
                Model: this.Model,
            })
            .then(function (mongoResults)
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

                    let errMsg = "An unknown error occurred in " + 
                                 "getMostRecent()";

                    if (this.constructor && this.constructor.name)
                    {
                        errMsg = "An unknown error occurred in " + 
                                 this.constructor.name + 
                                 ".getMostRecent()";
                    }

                    reject(errMsg);
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
		return new Promise(async function (resolve, reject)
		{
            await MongoControllerHelpers.validateStaticVariables({
                collectionName: this.collectionName,
                Model: this.Model,
                controllerName: this.constructor.name,
            })
            .catch(function (errors)
            {
                reject(errors);
            });

			console.info("Inserting one into database...");
			
			MongoControllerHelpers.insertOne({
                connection: this.#connection,
                obj,
                collectionName: this.collectionName,
                Model: this.Model,
            })
            .then(function (model)
            {
                console.info("Successfully inserted one to database.");
                resolve(model);
            })
            .catch(function (errResults)
            {
                console.error("Failed to insert one to database:", errResults);
                reject(errResults);
            });
		});
    }
}



class MongoControllerHelpers
{
	/* 
	 * GETS
	 */
    
	static async queryResources({
        connection,
        findParams,
        collectionName,
        sortOptions,
        Model,
    })
	{
		return new Promise(function (resolve, reject)
		{
			connection.getCollection({ collectionName })
            .then(async function (collection)
            {
                // Make query
                const result = await collection.find(findParams)
                                                .sort(sortOptions);
                const array = await result.toArray();
                
                // Done searching, close connection
                await connection.close();
                
                // Parse array into an array of models
                const models = MongoControllerHelpers.getAsModels(array, Model);
                
                // Initialize results
                const mongoResults = new MongoResults({ results: models });
                resolve(mongoResults);
            })
            .catch(function (err)
            {
                const errResults = new MongoResults({ error: err, status: 500 });
                reject(errResults);
            });
		});
	}

	static async queryResource({
        connection,
        findParams,
        collectionName,
        Model,
    })
	{
		return new Promise(function (resolve, reject)
		{
			connection.getCollection({ collectionName })
            .then(async function (collection)
            {
                // Make query
                const result = await collection.findOne(findParams);
                
                // Done searching, close connection
                await connection.close();

                // Failed query (only happens in findOne)
                if (!result)
                {
                    let errMsg = "No data was found";

                    if (Model && Model.constructor && Model.constructor.name)
                    {
                        errMsg = `No ${Model.constructor.name} was found`;
                    }
                    
                    const errResults = new MongoResults({ error: errMsg, status: 500 });
                    reject(errResults);
                }
                
                // Parse into model
                const model = MongoControllerHelpers.getAsModel(result, Model);
                
                // Initialize results
                const mongoResults = new MongoResults({ results: model });
                resolve(mongoResults);
            })
            .catch(function (err)
            {
                const errResults = new MongoResults({ error: err, status: 500 });
                reject(errResults);
            });
		});
	}
	
	static getAsModels(array, Model)
	{
		const models = [];
		
		for (let i = 0; i < array.length; i++)
		{
			const model = MongoControllerHelpers.getAsModel(array[i], Model);
			models.push(model);
		}
		
		return models;
	}
	
	static getAsModel(document, Model)
	{
		return new Model(document);
	}



	/* 
	 * POSTS
	 */
    
	static async insertOne({
        connection,
        obj,
        collectionName,
        Model,
    })
	{
		return new Promise(function (resolve, reject)
		{
			connection.getCollection({ collectionName })
            .then(async function (collection)
            {
                // Make query
                const model = MongoControllerHelpers.getAsModel(obj, Model);

                // Validation is successful or there is no validation
                if (!model.isValid || model.isValid())
                {
                    // Insert
                    await collection.insertOne(model);

                    // Done inserting, close connection
                    await connection.close();

                    // Return the model
                    resolve(model);
                }
                else
                {
                    reject(new ModelIsInvalidError());
                }
            })
            .catch(function (err)
            {
                const errResults = new MongoResults({ error: err, status: 500 });
                reject(errResults);
            });
		});
	}



	/* 
	 * ERRORS
	 */

    static validateStaticVariables({
        collectionName,
        Model,
        controllerName,
    })
	{
		return new Promise(function (resolve, reject)
		{
			console.debug(`Validating ${controllerName} static variables...`);

            const errors = [];

            if (!collectionName)
            {
                errors.push(new CollectionNameNotSetError());
            }

            if (!Model)
            {
                errors.push(new ModelNotSetError());
            }

            if (errors.length > 0)
            {
                console.error(`${controllerName} static variable validation failed.`);
                reject(errors);
            }

            resolve(true);
		});
	}
}



module.exports = MongoController;
