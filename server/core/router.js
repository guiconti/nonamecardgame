const gameController = require('../controllers/gameController');
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser').json();

router.use(bodyParser);

router.get('/', (req, res) => {res.status(200).sendFile(process.cwd() + '/server/views/index.html')});
router.post('/game/create', gameController.newGame);
router.get('/game/:gameId', gameController.enterGame);
router.post('/game/:gameId/player/insert', gameController.addPlayer);

module.exports = router;