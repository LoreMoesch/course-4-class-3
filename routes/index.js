const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(process.env.NAME);
  indexController.getIndex(req, res);
});

router.get('/players', function(req, res) {
  indexController.getPlayers(req, res);
});

router.post('/players', function(req, res) {
  indexController.postPlayers(req, res);
});

module.exports = router;
