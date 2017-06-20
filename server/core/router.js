const gameController = require('../controllers/gameController');
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser').json();

router.use(bodyParser);

router.get('/', (req, res) => {res.status(200).json({msg: 'oi'})});
router.post('/game/create', gameController.newGame);
router.get('/game/:gameId', gameController.enterGame);
router.post('/game/player/insert', gameController.addPlayer);

module.exports = router;