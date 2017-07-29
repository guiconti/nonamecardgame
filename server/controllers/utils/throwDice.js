const logger = require('../../../tools/logger');

module.exports = (sizes) => {
    try {
        if (sizes > 0){
            return (Math.floor(Math.random() * sizes) + 1);
        } else {
            return -1;
        }
    } catch(err){
        logger.logError(err);
        return -1;
    }
};