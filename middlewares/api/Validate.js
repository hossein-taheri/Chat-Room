const Joi = require('joi');

const Validate = (req, BodySchema, ParamsSchema, QuerySchema) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (BodySchema)
                req.body = await Joi.object(BodySchema).validateAsync(req.body);
            if (ParamsSchema)
                req.params = await Joi.object(ParamsSchema).validateAsync(req.params);
            if (QuerySchema)
                req.query = await Joi.object(QuerySchema).validateAsync(req.query);

            resolve(req);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = Validate;