var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');//gives us acces to PG

router.get('/', function (req, res) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
        if(errorConnectingToDatabase) {
            console.log('there was an error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            db.query('SELECT * FROM tasks ORDER BY is_complete, id;', function(errorMakingQuery, result) {
                done();
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

router.post('/', function(req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        done();
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO tasks (name)
                        VALUES ($1);`, [req.body.name], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    })
});//end router.post

router.put('/complete/:id', function(req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        done();
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE tasks SET is_complete = TRUE WHERE
                        id= $1;`, [req.params.id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    })
});

router.delete('/remove/:id', function(req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        done();
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM tasks WHERE id= $1;`, [req.params.id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    })
});

module.exports = router;