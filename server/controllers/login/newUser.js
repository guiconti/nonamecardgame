const validator = require('../utils/validator');
const _ = require('underscore');
const tokenManager = require('../utils/tokenManager');
const logger = require('../../../tools/logger');

module.exports = (req, res) => {
    try{
        let body = _.pick(req.body, 'name');
        if(!validator.isValidUser(body)) {
            return res.status(400).json({title: 'Not a valid user name.', body: 'You have to insert a username.'});
        }

        let userData = {
            name: body.name.trim(),
            address: req.connection.remoteAddress
        };
        tokenManager.generateToken(userData).then((token) => {
            // Set the cookie
            res.cookie('session', token, {maxAge: 365*24*60*60*1000});
            return res.status(200).json({redirectUrl: '/'});
        }, (err) => {
            throw err;
        });    
    } catch(err){
        res.status(500).json({title: 'Server error', body: 'Something happened and even we don`t know what it is.'});
        return logger.logError(err);
    }
    
};