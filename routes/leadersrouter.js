const express = require('express');
const bodyparser = require('body-parser');
const leaders = express.Router();
const Leaders = require('../models/leaders');
const authenticate = require('../authentication');
var cors=require('../cors');
leaders.use(bodyparser.json());
leaders.route('/leaders')
.options(cors.corsoptions,(req,res)=>{
    res.statusCode=200;
})
    .get(cors.cors,(req, res, next) => {
        Leaders.find({})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post(cors.corsoptions,authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        Leaders.create(req.body).then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .put(cors.corsoptions,authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");

    })
    .delete(cors.corsoptions,authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        Leaders.deleteOne({}).then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err)).catch((err) => console.log(err));

    });
leaders.route('/leaders/:leaderId')
.options(cors.corsoptions,(req,res)=>{
    res.statusCode=200;
})
    .get(cors.cors,(req, res, next) => {
        Leaders.findById(req.params.leaderId).then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post(cors.corsoptions,authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");

    })
    .put(cors.corsoptions,authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        Leaders.findOneAndUpdate(req.params.leaderId,{$set:req.body},{new:true}).then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);

        }, (err) => next(err)).catch((err) => console.log(err))
    }) 
    .delete(cors.corsoptions,authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        Leaders.findOneAndDelete(req.params.leaderId).then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);

        }, (err) => next(err)).catch((err) => console.log(err));

    });
module.exports = leaders;