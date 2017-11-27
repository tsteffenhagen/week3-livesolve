var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');//gives us acces to PG

router.get('/', function (req, res) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
        if(errorConnectingToDatabase) {
            console.log('there was an error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            db.query('SELECT * FROM tasks;', function(errorMakingQuery, result) {
                if(errorMakingQuery) {
                    console.log('there was an error making the query', errorMakingQuery);
                    res.sendStatus(500);                    
                } else {
                    res.send(result.rows);
                }
            })
        }
    })
}); //end router.get

module.exports = router;