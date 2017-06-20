"use strict";

/* eslint-disable no-console */

require('dotenv').config();
require('../server/core/mongoose');
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const server = require('http').createServer(app);  
//  Global IO is really necessary?
global.io = require('socket.io')(server);
const router = require('../server/core/router.js');

app.use(router);

server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.info("🌎  Server is listening on port %s.", PORT);
    }
});
