const Joi = require("joi");
const Validate = require("../Validate");
const ApiResponse = require("../../../helpers/responses/ApiResponse");

const AuthValidator = {
    register: (req, res, next) => {
        Validate(req,
            {
                email: Joi
                    .string()
                    .required()
                    .email(),
                password: Joi
                    .string()
                    .required()
                    .min(6)
                    .max(30),
            })
            .then(req => {
                next()
            })
            .catch(err => {
                return ApiResponse
                    .JoiError(
                        req,
                        res,
                        err
                    )
            })
    },
    login: (req, res, next) => {
        Validate(req,
            {
                email: Joi
                    .string()
                    .required()
                    .email(),
                password: Joi
                    .string()
                    .required()
                    .min(6)
                    .max(30),
            })
            .then(req => {
                next()
            })
            .catch(err => {
                return ApiResponse
                    .JoiError(
                        req,
                        res,
                        err
                    )
            })
    },

}


module.exports = AuthValidator;
