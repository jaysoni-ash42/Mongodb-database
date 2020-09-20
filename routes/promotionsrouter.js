const express = require('express');
const bodyparser = require('body-parser');
const promotions = express.Router();
promotions.use(bodyparser.json());
const Promotions = require('../models/promotions');
const authenticate = require('../authentication');
var cors = require('../cors');
promotions.route('/promotions')
    .options(cors.corsoptions, (req, res) => {
        res.statusCode = 200;
    })
    .get(cors.cors, (req, res, next) => {
        Promotions.find({})
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post(cors.corsoptions, authenticate.verify, authenticate.verifyadmin, (req, res, next) => {
        Promotions.create(req.body).then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .put(cors.corsoptions, authenticate.verify, authenticate.verifyadmin, (req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");

    })
    .delete(cors.corsoptions, authenticate.verify, authenticate.verifyadmin, (req, res, next) => {
        Promotions.deleteOne({}).then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err)).catch((err) => console.log(err));

    });
promotions.route('/promotions/:promotionId')
    .options(cors.corsoptions, (req, res) => {
        res.statusCode = 200;
    })
    .get(cors.cors, (req, res, next) => {
        Promotions.findById(req.params.promotionId).then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post(cors.corsoptions, authenticate.verify, authenticate.verifyadmin, (req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");

    })
    .put(cors.corsoptions, authenticate.verify, authenticate.verifyadmin, (req, res, next) => {
        Promotions.findOneAndUpdate(req.params.promotionId, { $set: req.body }, { new: true }).then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);

        }, (err) => next(err)).catch((err) => console.log(err))
    })
    .delete(cors.corsoptions, authenticate.verify, authenticate.verifyadmin, (req, res, next) => {
        Promotions.findOneAndDelete(req.params.promotionId).then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);

        }, (err) => next(err)).catch((err) => console.log(err));

    });
module.exports = promotions;