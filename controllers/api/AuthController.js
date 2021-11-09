const AuthService = require("../../services/AuthService");
const ApiResponse = require("../../helpers/responses/ApiResponse");
const AuthController = {
    register(req, res, next) {
        try {
            const {user, token, expiresIn} = AuthService.register(req.body.email, req.body.password)

            return ApiResponse
                .message(
                    req,
                    res,
                    null,
                    {
                        user,
                        token,
                        expiresIn
                    }
                )

        } catch (err) {
            next(err)
        }
    },
    login(req, res, next) {
        try {
            const {token, expiresIn} = AuthService.login(req.body.email, req.body.password)

            return ApiResponse
                .message(
                    req,
                    res,
                    null,
                    {
                        token,
                        expiresIn
                    }
                )

        } catch (err) {
            next(err)
        }
    }
}


module.exports = AuthController