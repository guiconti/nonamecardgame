const gameController = require('../controllers/gameController');
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser').json();

router.use(bodyParser);

router.get('/', (req, res) => {res.status(200).json({msg: 'oi'})});
router.post('/game/create', gameController.newGame);

module.exports = router;