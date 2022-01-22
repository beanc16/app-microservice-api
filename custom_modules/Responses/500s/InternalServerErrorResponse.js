const Response = require("../Response");



class InternalServerErrorResponse extends Response
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
            res.status(500);
        }
        
        super({
            res,
            message: (message) ? message : "Internal Server Error",
            data,
            error,
        });
    }
}



module.exports = InternalServerErrorResponse;
