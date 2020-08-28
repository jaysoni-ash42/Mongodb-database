const express = require('express');
const bodyparser = require('body-parser');
const leaders = express.Router();
const Leaders = require('../models/leaders');
leaders.use(bodyparser.json());
leaders.route('/leaders')
    .get((req, res, next) => {
        Leaders.find({})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post((req, res, next) => {
        Leaders.create(req.body).then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");

    })
    .delete((req, res, next) => {
        Leaders.deleteOne({}).then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err)).catch((err) => console.log(err));

    });
leaders.route('/leaders/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId).then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");

    })
    .put((req, res, next) => {
        Leaders.findOneAndUpdate(req.params.leaderId,{$set:req.body},{new:true}).then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);

        }, (err) => next(err)).catch((err) => console.log(err))
    }) 
    .delete((req, res, next) => {
        Leaders.findOneAndDelete(req.params.leaderId).then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);

        }, (err) => next(err)).catch((err) => console.log(err));

    });
module.exports = leaders;