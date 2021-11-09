const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

module.exports = (app) => {

    app.use(cors());

    //Secure app By Helmet
    app.use(helmet());

    //Some main express configs
    app.use(express.static('public'));

    app.use(express.json());

    app.use(express.urlencoded({
        extended: true
    }));

    //Log requests with morgan
    app.use(morgan("dev"));
}