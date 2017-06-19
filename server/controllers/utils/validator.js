const _ = require('underscore');

exports.isValidGame = (name, password) => {
    return (_.isString(name) && name.trim().length > 0) && 
    (_.isUndefined(password) || (_.isString(password) && password.trim().length > 0));
}