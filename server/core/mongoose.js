const mongoose = require('mongoose');
const fs = require('fs');

// Connect to the database
mongoose.connect(process.env.DB_HOST, {server:{auto_reconnect:true}});
const db = mongoose.connection;

// Connection fails log the error
db.on('error', function(err){
    console.error('MongoDB connection error: ', err);
});

// Connection ok log the success
db.once('open', function callback(){
    console.info('MongoDB connection is established.');    
});

// Connect lost log the event and try to reconnect
db.on('disconnected', function() {
    console.error('MongoDB disconnected.');
    mongoose.connect(process.env.DB_HOST, {server:{auto_reconnect:true}});        
});

// Connect restablished log the event
db.on('reconnected', function() {
    console.info('MongoDB reconnected.');
});

// Load our DB models
let models_path = process.cwd() + '/server/models';

fs.readdirSync(models_path).forEach(function (file){
    if (~file.indexOf('.js')){
        require(models_path + '/' + file);
    }
});
