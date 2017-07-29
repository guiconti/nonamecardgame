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
    id: '',
    idAux: ''
};

require('../controllers/login');
require('../controllers/createGame');
require('../controllers/enterGame');
require('../controllers/joinGame');
require('../controllers/startGame');
require('../controllers/pickDungeon');