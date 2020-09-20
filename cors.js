var express = require('express');
var cors = require('cors');
var app=express();

const whitelist=['https://localhost:3443','http://localhost:3000'];
var corsoptionsDelegate = (req,callback)=>{
    var corsoptions;
    if(whitelist.indexOf(req.header('Origin')!=-1))
    {
        corsoptions={origin:true};
    }
    else
    {
        corsoptions={origin:false};
    }
    callback(null,corsoptions);

};
exports.cors=cors();
exports.corsoptions=cors(corsoptionsDelegate);