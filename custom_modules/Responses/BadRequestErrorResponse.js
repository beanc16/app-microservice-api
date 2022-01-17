const Response = require("./Response");



class BadRequestErrorResponse extends Response
{
    constructor({
        res,        // For status code
        message,    // For error messages
        data,       // For error messages with data
        error,      // For error messages
    })
    {
        if (res)
        {
            res.status(400);
        }
        
        super({
            res,
            message: (message) ? message : "Bad Request",
            data,
            error,
        });
    }
}



module.exports = BadRequestErrorResponse;
