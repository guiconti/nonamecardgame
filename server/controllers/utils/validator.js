const _ = require('underscore');

exports.isValidGame = (name, password) => {
    return (_.isString(name) && name.trim().length > 0) && 
    (_.isUndefined(password) || (_.isString(password) && password.trim().length > 0));
};

exports.isValidGameId = (gameId) => {
    return _.isString(gameId) && gameId.trim().length > 0;
};
