const express = require('express');
const bodyparser = require('body-parser');
const upload = express.Router();
const authenticate = require('../authentication');
const multer = require('multer');
const Users=require('../models/user');
upload.use(bodyparser.json());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    }
}, {
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const imagefileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jepg|jpg|png|gif)$/)) {
        return cb(new Error('you can upload image only not the other media files'), false);
    }
    cb(null, true);
}
var uploadata = multer({ storage: storage, fileFilter:imagefileFilter });

upload.route('/uploadimage')
    .get(authenticate.verify, authenticate.verifyadmin, (req, res, next) => {

        res.statusCode = 403;
        res.setHeader('Content-Type', 'plain/text');
        res.end("get cannot be done in this operation");

    })
    .put(authenticate.verify, authenticate.verifyadmin, (req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'plain/text');
        res.end("get cannot be done in this operation");

    })
    .post(authenticate.verify, authenticate.verifyadmin, uploadata.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })
    .delete(authenticate.verify, authenticate.verifyadmin, (req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end("get cannot be done in this operation");

    });
    upload.route('/uploadprofile')
    .get(authenticate.verify, (req, res, next) => {

        res.statusCode = 403;
        res.setHeader('Content-Type', 'plain/text');
        res.end("get cannot be done in this operation");

    })
    .put(authenticate.verify, (req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'plain/text');
        res.end("get cannot be done in this operation");

    })
    .post(authenticate.verify, uploadata.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })
    .delete(authenticate.verify,(req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end("get cannot be done in this operation");

    });

module.exports = upload;
