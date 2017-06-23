const validator = require('../utils/validator');
const tokenManager = require('../utils/tokenManager');
const logger = require('../../../tools/logger');

module.exports = (req, res) => {
    try{
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
            res.render('login');
            throw err;
        });
    } catch(err){
        return logger.logError(err);
    }
    
};