const middleware = require('../controllers/middleware');
const login = require('../controllers/login/login');
const gameController = require('../controllers/gameController');
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser').json();

router.use(bodyParser);

router.get('/', login.rootAccess);
router.post('/login', login.newUser);

router.post('/game/create', middleware.validateToken, gameController.createRoom);
router.get('/game/:gameId', middleware.validateToken, gameController.enterRoom);

router.get('/game/:gameId/join', middleware.validateToken, gameController.addPlayer);
router.get('/game/:gameId/start', middleware.validateToken, gameController.startGame);

//  Card control APIs
router.get('/game/:gameId/dungeon/pick', middleware.validateToken, gameController.pickDungeon);

//  Fight APIs
router.post('/game/:gameId/fight/ask_help', middleware.validateToken, gameController.askHelp);
router.get('/game/:gameId/fight/ask_help/accept', middleware.validateToken, gameController.acceptHelp);
router.get('/game/:gameId/fight/ask_help/refuse', middleware.validateToken, gameController.refuseHelp);
router.get('/game/:gameId/fight/run', middleware.validateToken, gameController.run);
router.post('/game/:gameId/fight/use_item', middleware.validateToken, gameController.useItem);
router.get('/game/:gameId/fight/finish_interfere', middleware.validateToken, gameController.finishInterfere);

module.exports = router;