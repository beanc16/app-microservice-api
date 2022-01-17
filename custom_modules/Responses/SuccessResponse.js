const Response = require("./Response");



class SuccessResponse extends Response
{
    constructor({
        res,        // For status code
        message,    // For success messages
        data,       // For success messages with data
    })
    {
        if (res)
        {
            res.status(200);
        }
        
        super({
            res,
            message,
            data,
        });
    }
}



module.exports = SuccessResponse;
