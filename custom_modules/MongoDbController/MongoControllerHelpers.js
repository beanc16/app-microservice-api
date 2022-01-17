// Mongo
const { ObjectId } = require("mongodb");
const MongoResults = require("./MongoResults");


// Models
const {
    CollectionNameNotSetError,
    ModelNotSetError,
    ModelIsInvalidError,
} = require("./errors");



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
            findParams = MongoControllerHelpers.convertIdToObjectId(findParams);

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
			findParams = MongoControllerHelpers.convertIdToObjectId(findParams);

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
                obj = MongoControllerHelpers.convertIdToObjectId(obj);

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

            console.debug(`${controllerName} static variable validation succeeded.`);
            resolve(true);
		});
	}



	/* 
	 * UTILITY
	 */

    static convertIdToObjectId(findParams)
    {
        if (findParams._id)
        {
            findParams._id = new ObjectId(findParams._id);
        }
        
        else if (findParams.id)
        {
            findParams._id = new ObjectId(findParams.id);
            delete findParams.id;
        }

        return findParams;
    }
}



module.exports = MongoControllerHelpers;
