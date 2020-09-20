const express = require('express');
const bodyparser = require('body-parser');
const favourite = express.Router();
const Favourite = require('../models/favourite');
const Dishes = require('../models/dishes');
const authenticate = require('../authentication');
favourite.use(bodyparser.json());
favourite.route('/favourite')
    .get(authenticate.verify, (req, res, next) => {
        Favourite.findOne({ users: req.user._id }).populate(['users', 'dishes']).then((favourite) => {
            res.statusCode = 200;
            res.setHeader("Cotent-Type", 'application/json');
            res.json(favourite)
        }, (err) => next(err)).catch((err) => console.log(err));
    })
    .post(authenticate.verify, (req, res, next) => {
        res.statusCode = 403;
        res.end("post operation not supported");
    })
    .put(authenticate.verify, (req, res, next) => {
        res.statusCode = 403;
        res.end("put operation is not suitable");
    })
    .delete(authenticate.verify, (req, res, next) => {
        Favourite.findOne({ users: req.user._id })
            .then((favourite) => {
                if (favourite != null) {
                    Favourite.findByIdAndRemove(favourite._id).populate(['users', 'dishes']).then((resp) => {
                        res.statusCode = 200;
                        res.setHeader("Cotent-Type", 'application/json');
                        res.json(resp);
                    }, (err) => next(err));
                }
                else {
                    err = new Error('favourite' + req.user._id + 'not found');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => console.log(err));

    });
favourite.route('/favourite/:dishId')
    .get(authenticate.verify, (req, res, next) => {
        res.statusCode = 403;
        res.end("get operation is not supported");
    })
    .post(authenticate.verify, (req, res, next) => {
        Favourite.findOne({ users: req.user._id }).then((favourite) => {
            if (favourite==null) {

                Favourite.create({ users: req.user._id }).then((favourite) => {
                    console.log('favorite created!');
                    Dishes.findById(req.params.dishId).then((dish)=>{
                        if(dish!=null)
                        {
                        favourite.dishes.push(req.params.dishId);
                        favourite.save().then((favourite) => {
                            Favourite.findById(favourite._id)
                                .populate(['users', 'dishes'])
                                .then((favourite) => {
                                    res.statusCode = 200;
                                    res.setHeader("Cotent-Type", 'application/json');
                                    res.json(favourite);
                                });
        
                        },(err)=>next(err));
                    }
                    else{
                        res.statusCode=400;
                        res.end('dish is not present');
                    }
                    });

                }).catch((err) => console.log(err));

            }
            else {
                console.log("i Am here");
                if(favourite.dishes.indexOf(req.params.dishId)!=-1)
                {
                res.statusCode=200;
                res.end("your dish id is already present in the list");
            }
            else{
                Dishes.findById(req.params.dishId).then((dish)=>{
                    if(dish!=null)
                    {
                    favourite.dishes.push(req.params.dishId);
                    favourite.save().then((favourite) => {
                        Favourite.findById(favourite._id)
                            .populate(['users', 'dishes'])
                            .then((favourite) => {
                                res.statusCode = 200;
                                res.setHeader("Cotent-Type", 'application/json');
                                res.json(favourite);
                            });
    
                    },(err)=>next(err));
                }
                else{
                    res.statusCode=400;
                    res.end('dish is not present');
                }
                });
               
            }
            }

        }).catch((err) => console.log(err));
    })
    .put(authenticate.verify, (req, res, next) => {
        res.statusCode = 403;
        res.end("authorization denied");
    })
    .delete(authenticate.verify, (req, res, next) => {
        Favourite.findOne({users:req.user._id})
            .then((favourite) => {
                if (favourite != null) {
                   if(favourite.dishes.indexOf(req.params.dishId)!=-1)
                   {
                       favourite.dishes.splice(favourite.dishes.indexOf(req.params.dishId),1);
                    favourite.save().then((resp) => {
                        res.statusCode = 200;
                        res.setHeader("Cotent-Type", 'application/json');
                        res.json(resp);
                    }, (err) => next(err));
                }
                else{
                    res.statusCode=404;
                    res.end("item not found");
                }
                }
                else {
                    err = new Error('Dish' + req.user._id + 'not found');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => console.log(err));

    });
module.exports = favourite;