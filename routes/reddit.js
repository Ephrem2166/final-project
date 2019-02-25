var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var RedditPop = require('../models/Reddit/PopularFunny.js');
var RedditNews = require('../models/Reddit/News.js');
var Reddit = require('../models/Reddit/RedditAll.js');

/* 
Get method for ProgrammerHumor subreddit 
Link - /redditapi/pf
*/
router.get('/pf', function(req, res){
    RedditPop.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
});

/* 
Get method for ProgrammerHumor subreddit 
Link - /redditapi/news
*/
router.get('/news', function(req, res){
    RedditNews.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
});

/* 
Get method for ProgrammerHumor subreddit 
Link - /redditapi/all
*/
router.get('/all', function(req, res){
    Reddit.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
});

/* 
Get method for specific post using ID
Link - /redditapi/all/:id
*/
router.get('/all/:id', function (req, res, next) {
    Reddit.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
module.exports = router;