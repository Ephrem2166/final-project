// !!!!!!!!!!!!!!!!!!!!!!!! MUST REFACTOR THIS CLASS AS api.js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var User = require('../models/User.js');

// Authnitcation imports
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

// Import required models
var User = require("../models/user");
var Profile = require("../models/profile");

/**
 * Create router to register new user
 */
router.post('/signup', function (req, res) {
  // console.log("DEBUG_user.jsPOSTUSER /signup")
  console.log('\x1b[34m%s\x1b[0m', "DEBUG : POST USER signup"); //blue cmd

  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please enter username and password.'
    });
  } else {
    // create user object
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    var newProfile = new Profile({
      username: req.body.username,
      first_name: req.body.first_name,
      surname: req.body.surname
    });

    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Username already exists, please choose another.'
        });
      }
      res.json({
        success: true,
        msg: 'Successful user account created.'
      });
    });
    newProfile.save();
  }
});

/**
 * Create router to login
 */
router.post('/signin', function (req, res) {
  // console.log('DEBUG : Router post signin');
  console.log('\x1b[34m%s\x1b[0m', "DEBUG : Router post signin"); //blue cmd

  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    // check if valid user
    if (!user) {
      res.status(401).send({
        success: false,
        msg: 'Log in failed. User not found.'
      });
    } else {
      // check if password correct
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: 'JWT ' + token
          });
        } else {
          res.status(401).send({
            success: false,
            msg: 'Incorrect password.'
          });
        }
      });
    }
  });
});


/**
 * Create router to add new book ===================> change to post
 * User must be authorized
 */
router.post('/book', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  // rETRIEVE Token from header
  var token = getToken(req.headers);
  // console.log("DEBUG ADDING BOOK using/book ========================");
  console.log('\x1b[34m%s\x1b[0m', "DEBUG : ADDING BOOK using/book"); //blue cmd

  if (token) { // check if user is authorised
    // DEBUG
    console.log(req.body);
    //console.log("DEBUG ADDING BOOK is token");
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : ADDING BOOK is token"); //blue cmd

    var newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      published_year: req.body.published_year,
      publisher: req.body.publisher
    });

    newBook.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Book(Post) failed to save.'
        });
      }
      res.json({
        success: true,
        msg: 'Successful created new book(Post).'
      });
    });
  } else {
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : ADDING BOOK not authorised"); //blue cmd

    return res.status(403).send({
      success: false,
      msg: 'Unauthorized to upload.'
    });
  }
});

/**
 * Create router to get list of all books ===================> change to post
 * User must be authorized
 */
router.get('/book', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});

/**
 * GET Method to return profile details
 */
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : Get profile by id is token"); //blue cmd

    Profile.findOne({
      username: req.body.username
    }, function (err, profile) {
      if (err) return next(err);
      res.json(profile);
    });
  } else {
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : Get profile by id is not token"); //blue cmd

    return res.status(403).send({
      success: false,
      msg: 'Unauthorized access to profile.'
    });
  }
});

/**
 *  parse authorization token from request headers.
 */
getToken = function (headers) {
  console.log("DEBUG: book.js get token");
  console.log('\x1b[34m%s\x1b[0m', "DEBUG : user.js getToken"); //blue cmd

  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
/* Return home hope and GET ALL BOOKS */

router.get('/users', function (req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});



// export router as module
module.exports = router;
