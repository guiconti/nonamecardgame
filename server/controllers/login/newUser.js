const validator = require('../utils/validator');
const _ = require('underscore');
const tokenManager = require('../utils/tokenManager');
const logger = require('../../../tools/logger');

module.exports = (req, res) => {
    try{
        let body = _.pick(req.body, 'name');
        if(!validator.isValidUser(body)) {
            return res.status(400).json({msg: 'Not valid user info.'});
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
            res.status(500).json({msg: 'Error generating cookie'});
            throw err;
        });    
    } catch(err){
        return logger.logError(err);
    }
    
};