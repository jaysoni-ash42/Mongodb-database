const bodyparser = require('body-parser');
const express = require('express');
const dishroutes = express.Router();
dishroutes.use(bodyparser.json());
const Dishes = require('../models/dishes');
dishroutes.route('/dishes')
    .get((req, res, next) => {

        Dishes.find({}).exec()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader("Cotent-Type", 'application/json');
                res.json(dish)
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post((req, res, next) => {
        Dishes.create(req.body).then((dish) => {
            res.statusCode = 200;
            res.setHeader("Cotent-Type", 'application/json');
            res.json(dish)
            console.log("Dish created" + dish);

        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .delete((req, res, next) => {
        Dishes.remove({}).then((resp) => {
            res.statusCode = 200;
            res.setHeader("Cotent-Type", 'application/json');
            res.json(resp);
            console.log("dishes deleted");
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");
    });

dishroutes.route('/dishes/:dishId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId).then((dish) => {
            res.statusCode = 200;
            res.setHeader("Cotent-Type", 'application/json');
            res.json(dish)
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("post operations are not supported on dishes");

    })
    .delete((req, res, next) => {
        Dishes.findOneAndRemove(req.params.dishId).then((resp) => {
            res.statusCode = 200;
            res.setHeader("Cotent-Type", 'application/json');
            res.json(resp);
            console.log("dishes deleted");
        }, (err) => next(err)).catch((err) => console.log(err));

    })
    .put((req, res, next) => {
        Dishes.findOneAndUpdate(req.params.dishId, { $set: req.body }, { new: true }).exec().then((dish) => {
            res.statusCode = 200;
            res.setHeader("Cotent-Type", 'application/json');
            res.json(dish);
        }, (err) => next(err)).catch((err) => console.log(err));
    });
dishroutes.route('/dishes/:dishId/comments')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    res.statusCode = 200;
                    res.setHeader("Cotent-Type", 'application/json');
                    res.json(dish.comments);
                }
                else {
                    err = new Error('Dish' + req.params.dishId + 'not found');
                    err.statusCode = 404;
                    return next(err);

                }
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    dish.comments.push(req.body);
                    dish.save().then((dish) => {
                        res.statusCode = 200;
                        res.setHeader("Cotent-Type", 'application/json');
                        res.json(dish.comments);
                    }, (err) => next(err));
                }
                else {
                    err = new Error('Dish' + req.params.dishId + 'not found');
                    err.statusCode = 404;
                    return next(err);

                }
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    for (var i = dish.comments.length - 1; i >= 0; i--) {
                        dish.comments.id(dish.comments[i]._id).remove();
                    }
                    dish.save().then((resp) => {
                        res.statusCode = 200;
                        res.setHeader("Cotent-Type", 'application/json');
                        res.json(resp);
                    }, (err) => next(err));
                }
                else {
                    err = new Error('Dish' + req.params.dishId + 'not found');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");
    });
dishroutes.route('/dishes/:dishId/comments/:commentsId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentsId) != null) {
                    res.statusCode = 200;
                    res.setHeader("Cotent-Type", 'application/json');
                    res.json(dish.comments.id(req.params.commentsId));
                }
                else {
                    err = new Error('Dish' + req.params.dishId + 'not found');
                    err.statusCode = 404;
                    return next(err);

                }
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("post operation not supported" + req.params.dishId + req.params.commentsId);

    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentsId) != null) {
                    dish.comments.id(req.params.commentsId).remove();
                    dish.save().then((dish) => {
                        res.statusCode = 200;
                        res.setHeader("Cotent-Type", 'application/json');
                        res.json(dish);
                    }, (err) => next(err));
                }
                else {
                    err = new Error('Dish' + req.params.dishId + 'not found');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => console.log(err));

    })
    .put((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentsId) != null) {
                    if (req.body.rating) {
                        dish.comments.id(req.params.commentsId).rating = req.body.rating;
                    }
                    if (req.body.comment) {
                        dish.comments.id(req.params.commentsId).comment = req.body.comment;
                    }
                    dish.save().then((dish) => {
                        res.statusCode = 200;
                        res.setHeader("Cotent-Type", 'application/json');
                        res.json(dish);
                    }, (err) => next(err));

                }
                else {
                    err = new Error('Dish' + req.params.dishId + 'not found');
                    err.statusCode = 404;
                    return next(err);

                }
            }, (err) => next(err)).catch((err) => console.log(err));
    });

module.exports = dishroutes;