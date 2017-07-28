require('dotenv').config();

/** Cookies for each player */
players = {
    one:{
        header: {'content-type': 'application/json'}
    }, 
    two:{
        header: {'content-type': 'application/json'}
    }, 
    three:{
        header: {'content-type': 'application/json'}
    }
};

gameInfo = {
    id: ''
};

require('../controllers/login');
require('../controllers/game');