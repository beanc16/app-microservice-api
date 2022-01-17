class Response
{
    constructor({
        res,        // For status code
        message,    // For success messages
        data,       // For success messages with data
        error,      // For error messages
    })
    {
        this.status = (res)
                        ? res.statusCode
                        : 200;
        this.message = (message)
                        ? message
                        : null;
        this.data = (data)
                        ? data
                        : null;
        this.error = (error)
                        ? error
                        : null;
    }
}



module.exports = Response;
