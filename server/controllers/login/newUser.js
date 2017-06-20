const validator = require('../utils/validator');
const _ = require('underscore');
const tokenManager = require('../tokenManager');

module.exports = (req, res) => {
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
        res.cookie('session', token, {maxAge: 9000000});
        return res.status(200).json({redirectUrl: '/'});
    }, (err) => {
        console.log(err);
        return res.status(500).json({msg: 'Error generating cookie'});
    });
};