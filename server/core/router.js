const middleware = require('../controllers/middleware');
const login = require('../controllers/login/login');
const gameController = require('../controllers/gameController');
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser').json();

router.use(bodyParser);

router.get('/', login.rootAccess);
router.post('/login', login.newUser);

router.post('/game/create', middleware.validateToken, gameController.newGame);
router.get('/game/:gameId', middleware.validateToken, gameController.enterGame);
router.post('/game/:gameId/player/insert', middleware.validateToken, gameController.addPlayer);

module.exports = router;