const express = require('express');
const bodyparser = require('body-parser');
const promotions = express.Router();
promotions.use(bodyparser.json());
const Promotions = require('../models/promotions');
const authenticate = require('../authentication');
promotions.route('/promotions')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post(authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        Promotions.create(req.body).then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .put(authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");

    })
    .delete(authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        Promotions.deleteOne({}).then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err)).catch((err) => console.log(err));

    });
promotions.route('/promotions/:promotionId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promotionId).then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post(authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");

    })
    .put(authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        Promotions.findOneAndUpdate(req.params.promotionId, { $set: req.body }, { new: true }).then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);

        }, (err) => next(err)).catch((err) => console.log(err))
    })
    .delete(authenticate.verify,authenticate.verifyadmin,(req, res, next) => {
        Promotions.findOneAndDelete(req.params.promotionId).then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);

        }, (err) => next(err)).catch((err) => console.log(err));

    });
module.exports = promotions;