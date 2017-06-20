const _ = require('underscore');
const validator = require('../utils/validator');
const tokenManager = require('../tokenManager');

exports.rootAccess = (req, res) => {
    if (!validator.isValidCookie(req.cookies)) {
        return res.render('login');
    }

    tokenManager.decryptToken(req.cookies.session).then((userData) => {
        var userData = {
            user: true,
            name: userData.name
        };
        return res.render('login', userData);
    }, (err) => {
        return res.render('login');
    });
};

exports.newUser = (req, res) => {
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