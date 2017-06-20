const login = require('../controllers/login/login');
const gameController = require('../controllers/gameController');
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser').json();

router.use(bodyParser);

router.get('/', login.rootAccess);
router.post('/login', login.newUser);

router.post('/game/create', gameController.newGame);
router.get('/game/:gameId', gameController.enterGame);
router.post('/game/:gameId/player/insert', gameController.addPlayer);

module.exports = router;