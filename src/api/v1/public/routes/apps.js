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


// Controllers
const { AppController } = require("../../../../js/controllers");


// Validation
const {
    validateGetAppsPayload,
    validateCreateAppPayload,
    validateUpdateAppPayload,
    validateDeleteAppPayload,
} = require("../validation");


// Custom variables
const {
    SuccessResponse,
    ValidationErrorResponse,
    BadRequestErrorResponse,
    InternalServerErrorResponse,
} = require("../../../../../custom_modules/Responses");





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
            const response = new SuccessResponse({
                res,
                message: getSuccessMessageForGetApps(req.query),
                data: data.results,
            });
            res.json(response);
        })
        .catch(function (err)
        {
            // Mongo Error
            if (err && err.status && err.status === 500)
            {
                const errResponse = new InternalServerErrorResponse({
                    res,
                    message: getGetMessageForNoAppsFound(req.query),
                });
                res.json(errResponse);
            }

            // Other error
            else
            {
                const errResponse = new BadRequestErrorResponse({
                    res,
                    message: getFailedMessageForGetApps(req.query),
                    err,
                });
                res.json(errResponse);
            }
        });
    })
    .catch(function (err)
    {
        const errResponse = new ValidationErrorResponse({
            error: err,
            res: res,
        });
        res.json(errResponse);
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
        AppController.insertOne(req.body)
        .then(function (data)
        {
            const response = new SuccessResponse({
                res,
                message: `Successfully created an app named ${req.body.displayName}`,
                data: data,
            });
            res.json(response);
        })
        .catch(function (err)
        {
            const errResponse = new BadRequestErrorResponse({
                res,
                message: `Failed to create an app named ${req.body.displayName}`,
                err,
            });
            res.json(errResponse);
        });
    })
    .catch(function (err)
    {
        const errResponse = new ValidationErrorResponse({
            error: err,
            res: res,
        });
        res.json(errResponse);
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

        AppController.updateOne(findParams, updateObj)
        .then(function (data)
        {
            const response = new SuccessResponse({
                res,
                message: getSuccessMessageForUpdateApps(findParams),
                data: data.results,
            });
            res.json(response);
        })
        .catch(function (err)
        {
            // Mongo Error
            if (err && err.status && err.status === 500)
            {
                const errResponse = new InternalServerErrorResponse({
                    res,
                    message: getUpdateMessageForNoAppsFound(findParams),
                });
                res.json(errResponse);
            }

            // Other error
            else
            {
                const errResponse = new BadRequestErrorResponse({
                    res,
                    message: getFailedMessageForUpdateApps(findParams),
                    err,
                });
                res.json(errResponse);
            }
        });
    })
    .catch(function (err)
    {
        const errResponse = new ValidationErrorResponse({
            error: err,
            res: res,
        });
        res.json(errResponse);
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
        AppController.deleteOne(req.body)
        .then(function (data)
        {
            const response = new SuccessResponse({
                res,
                message: getSuccessMessageForDeleteApps(req.body),
                data: data.results,
            });
            res.json(response);
        })
        .catch(function (err)
        {
            // Mongo Error
            if (err && err.status && err.status === 500)
            {
                const errResponse = new InternalServerErrorResponse({
                    res,
                    message: getDeleteMessageForNoAppsFound(req.body),
                });
                res.json(errResponse);
            }

            // Other error
            else
            {
                const errResponse = new BadRequestErrorResponse({
                    res,
                    message: getFailedMessageForDeleteApps(req.body),
                    err,
                });
                res.json(errResponse);
            }
        });
    })
    .catch(function (err)
    {
        const errResponse = new ValidationErrorResponse({
            error: err,
            res: res,
        });
        res.json(errResponse);
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
