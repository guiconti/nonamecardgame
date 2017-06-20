"use strict";

/* eslint-disable no-console */

require('dotenv').config();
require('../server/core/mongoose');
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const cookieParser = require('cookie-parser');
const server = require('http').createServer(app);  
//  Global IO is really necessary?
global.io = require('socket.io')(server);
io.on('connection', function(socket){
  socket.on('chatMessage', function(msg){
    io.emit('chatMessage', msg);
  });
});
const router = require('../server/core/router.js');

const viewsPath = (process.cwd() + '/server/views');
const layoutsPath = (process.cwd() + '/server/views/layout');
const hbs = require('express-handlebars');

app.engine('.html', hbs({extname: '.html', layoutsDir:layoutsPath}));
app.set('view engine', '.html');
app.set('views', viewsPath);

app.use(cookieParser());
app.use(router);

server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.info("🌎  Server is listening on port %s.", PORT);
    }
});
