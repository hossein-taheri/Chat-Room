const ApiResponse = require("../helpers/responses/ApiResponse");

const notFound = (app) => {
    app.use((req, res) => {
        // Respond with json
        ApiResponse
            .error(
                req,
                res,
                404,
                'Page Not Found'
            )
    });
}

module.exports = notFound;