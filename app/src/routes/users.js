const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { // /users/
  res.json({message: 'This is the users / route'});
});

router.get('/hola', function(req, res, next) { // /users/
  res.json({message: 'hola'});
});

module.exports = router;
