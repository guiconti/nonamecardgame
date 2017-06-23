// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
const rollbar = new Rollbar("922c8c77b67f41918d28689c42e53119");

exports.logError = (err) => {
    // record a generic message and send it to Rollbar
    rollbar.log(err);
};

