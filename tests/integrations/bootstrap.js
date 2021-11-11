const express = require("express");
const auth = require("../../routers/auth");
const request = require("supertest");
const app = express();

require('../../bootstrap/dotenv')


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/auth", auth);

require('../../bootstrap/error_handler')(app);

module.exports = {
    request,
    app
}