const express = require('express');
const app = express();
const http = require('http').createServer(app);

//request config
require('./bootstrap/request')(app);

//.env config
require('./bootstrap/dotenv');

//routing config
require('./bootstrap/router')(app);

//404 config
require('./bootstrap/not_found')(app);

//Error handler
require('./bootstrap/error_handler')(app);

//Socket config
require('./bootstrap/socket')(http)

//listening config
require('./bootstrap/server_listening')(http)