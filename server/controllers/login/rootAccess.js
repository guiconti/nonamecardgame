const validator = require('../utils/validator');
const tokenManager = require('../utils/tokenManager');

module.exports = (req, res) => {
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