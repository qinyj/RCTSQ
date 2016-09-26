var express = require('express');
var crypto=require('crypto');
var router = express.Router();
var User=require('../configs/user');
var File=require('../configs/file');
var fs=require("fs");
var bodyParser=require('body-parser');
var multer=require('multer');
var urlencodeParser=bodyParser.urlencoded({extended:false});

router.use(express.static('public'));
router.use(bodyParser.urlencoded({extended:false}));
router.use(multer({dest:'/tmp/'}).array('upload'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RCTS' });
});


module.exports = router;