/************
 * REQUIRES *
 ************/

// Routing
const express = require("express");
const app = express();


// Access req.body in post requests
const bodyParser = require("body-parser");
app.use(bodyParser.json());                         // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Telemetry
const { logger } = require("@beanc16/logger");


// Controllers
const { AppController } = require("../../../../js/controllers");


// Validation
const {
    validateGetAppsPayload,
    validateCreateAppPayload,
    validateUpdateAppPayload,
    validateDeleteAppPayload,
} = require("../validation");


// Response
const {
    Success,
    NotFound,
    Conflict,
    ValidationError,
    InternalServerError,
} = require("dotnet-responses");





/********
 * GETS *
 ********/

app.get("/", function(req, res)
{
    validateGetAppsPayload(req.query)
    .then(function (payload)
    {
        const findParams = convertEnvForFindParams(req.query);

        AppController.getAll(findParams)
        .then(function (data)
        {
            // App was found
            if (
                data && data.results &&
                Array.isArray(data.results) &&
                data.results.length > 0
            )
            {
                Success.json({
                    res,
                    message: getSuccessMessageForGetApps(req.query),
                    data: data.results,
                });
            }

            // App was not found
            else
            {
                NotFound.json({
                    res,
                    message: getGetMessageForNoAppsFound(req.query),
                });
            }
        })
        .catch(function (err)
        {
            const errMsg = getFailedMessageForGetApps(req.query);
            logger.error(errMsg, err);

            InternalServerError.json({
                res,
                message: errMsg,
                err,
            });
        });
    })
    .catch(function (err)
    {
        ValidationError.json({
            res,
            message: "Query Validation Error",
            error: err,
        });
    });
});

// Get apps - helper
function getSuccessMessageForGetApps(query)
{
    let str = "Successfully retrieved all apps";

    if (query.env)
    {
        str += ` from ${query.env}`;
    }

    if (query.searchName)
    {
        str += ` named ${query.searchName}`;
    }

    if (query._id)
    {
        str += ` with ID ${query._id}`;
    }
    else if (query.id)
    {
        str += ` with ID ${query.id}`;
    }

    return str;
}

// Get apps - helper
function getGetMessageForNoAppsFound(query)
{
    let str = "No apps were found";

    if (query.env)
    {
        str += ` from ${query.env}`;
    }

    if (query.searchName)
    {
        str += ` named ${query.searchName}`;
    }

    if (query._id)
    {
        str += ` with ID ${query._id}`;
    }
    else if (query.id)
    {
        str += ` with ID ${query.id}`;
    }

    return str;
}

// Get apps - helper
function getFailedMessageForGetApps(query)
{
    let str = "Failed to retrieve all apps";

    if (query.env)
    {
        str += ` from ${query.env}`;
    }

    if (query.searchName)
    {
        str += ` named ${query.searchName}`;
    }

    if (query._id)
    {
        str += ` with ID ${query._id}`;
    }
    else if (query.id)
    {
        str += ` with ID ${query.id}`;
    }

    return str;
}

// Get apps - helper
function convertEnvForFindParams(query)
{
    let findParams = query;

    if (query.env)
    {
        findParams = Object.assign({}, query, {
            // envs array includes query.env
            envs: {
                // $in for Mongo = array.includes() for JavaScript
                $in: [query.env]
            },
        });

        delete findParams.env;
    }
    
    return findParams;
}





/*********
 * POSTS *
 *********/

app.post("/", function(req, res)
{
    validateCreateAppPayload(req.body)
    .then(function (payload)
    {
        AppController.insertOneIfNotExists({
            searchName: req.body.searchName,
        }, req.body)
        .then(function (data)
        {
            const { model, result } = data.results;

            // Inserted successfully
            if (result.upsertedId)
            {
                Success.json({
                    res,
                    message: `Successfully created an app named ${req.body.displayName}`,
                    data: model,
                });
            }

            // App already exists
            else
            {
                Conflict.json({
                    res,
                    message: `An app with a searchName of ${req.body.searchName} already exists`,
                });
            }
        })
        .catch(function (err)
        {
            const errMsg = `Failed to create an app named ${req.body.displayName}`;
            logger.error(errMsg, err);

            InternalServerError.json({
                res,
                message: errMsg,
                err,
            });
        });
    })
    .catch(function (err)
    {
        ValidationError.json({
            res,
            error: err,
        });
    });
});





/***********
 * PATCHES *
 ***********/

app.patch("/", function(req, res)
{
    validateUpdateAppPayload(req.body)
    .then(function (payload)
    {
        const findParams = req.body.old;
        const updateObj = req.body.new;

        AppController.findOneAndUpdate(findParams, updateObj)
        .then(function (data)
        {
            Success.json({
                res,
                message: getSuccessMessageForUpdateApps(findParams),
                data: data.results,
            });
        })
        .catch(function (err)
        {
            // Mongo Error
            if (err && err.status && err.status === 404)
            {
                NotFound.json({
                    res,
                    message: getUpdateMessageForNoAppsFound(findParams),
                });
            }

            // Other error
            else
            {
                const errMsg = getFailedMessageForUpdateApps(findParams);
                logger.error(errMsg, err);

                InternalServerError.json({
                    res,
                    message: errMsg,
                    err,
                });
            }
        });
    })
    .catch(function (err)
    {
        ValidationError.json({
            res,
            error: err,
        });
    });
});

// Update apps - helper
function getSuccessMessageForUpdateApps(findParams)
{
    let str = "Successfully updated an app";

    if (findParams.searchName)
    {
        str += ` named ${findParams.searchName}`;
    }

    if (findParams._id)
    {
        str += ` with ID ${findParams._id}`;
    }
    else if (findParams.id)
    {
        str += ` with ID ${findParams.id}`;
    }

    return str;
}

// Update apps - helper
function getUpdateMessageForNoAppsFound(query)
{
    let str = "Failed to retrieve an app";

    if (query.searchName)
    {
        str += ` named ${query.searchName}`;
    }

    if (query._id)
    {
        str += ` with ID ${query._id}`;
    }
    else if (query.id)
    {
        str += ` with ID ${query.id}`;
    }

    return str;
}

// Update apps - helper
function getFailedMessageForUpdateApps(findParams)
{
    let str = "Failed to update an app";

    if (findParams.searchName)
    {
        str += ` named ${findParams.searchName}`;
    }

    if (findParams._id)
    {
        str += ` with ID ${findParams._id}`;
    }
    else if (findParams.id)
    {
        str += ` with ID ${findParams.id}`;
    }

    return str;
}





/***********
 * DELETES *
 ***********/

app.delete("/", function(req, res)
{
    validateDeleteAppPayload(req.body)
    .then(function (payload)
    {
        AppController.findOneAndDelete(req.body)
        .then(function (data)
        {
            Success.json({
                res,
                message: getSuccessMessageForDeleteApps(req.body),
                data: data.results,
            });
        })
        .catch(function (err)
        {
            // Mongo Error
            if (err && err.status && err.status === 404)
            {
                NotFound.json({
                    res,
                    message: getDeleteMessageForNoAppsFound(req.body),
                });
            }

            // Other error
            else
            {
                const errMsg = getFailedMessageForDeleteApps(req.body);
                logger.error(errMsg, err);

                InternalServerError.json({
                    res,
                    message: errMsg,
                    err,
                });
            }
        });
    })
    .catch(function (err)
    {
        ValidationError.json({
            res,
            error: err,
        });
    });
});

// Delete apps - helper
function getSuccessMessageForDeleteApps(findParams)
{
    let str = "Successfully deleted an app";

    if (findParams.searchName)
    {
        str += ` named ${findParams.searchName}`;
    }

    if (findParams._id)
    {
        str += ` with ID ${findParams._id}`;
    }
    else if (findParams.id)
    {
        str += ` with ID ${findParams.id}`;
    }

    return str;
}

// Delete apps - helper
function getDeleteMessageForNoAppsFound(query)
{
    let str = "Failed to retrieve an app";

    if (query.searchName)
    {
        str += ` named ${query.searchName}`;
    }

    if (query._id)
    {
        str += ` with ID ${query._id}`;
    }
    else if (query.id)
    {
        str += ` with ID ${query.id}`;
    }

    return str;
}

// Delete apps - helper
function getFailedMessageForDeleteApps(findParams)
{
    let str = "Failed to delete an app";

    if (findParams.searchName)
    {
        str += ` named ${findParams.searchName}`;
    }

    if (findParams._id)
    {
        str += ` with ID ${findParams._id}`;
    }
    else if (findParams.id)
    {
        str += ` with ID ${findParams.id}`;
    }

    return str;
}





module.exports = app;
