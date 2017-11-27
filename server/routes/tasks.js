var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
   res.send('Ho there!');
}); //end router.get

module.exports = router;