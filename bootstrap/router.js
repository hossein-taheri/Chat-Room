const router = require('../routers');

module.exports = (app) => {
    app.use('/', router);
}