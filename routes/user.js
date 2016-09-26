var express = require('express');
var router = express.Router();
var fs=require("fs");

/* GET users listing. */
router.get('/user',function(reg,res,next){
  res.render('user', { title: 'User' });
});

var docCon=require('../public/javascripts/docConvert');

router.post('/upload',function (req,res) {
  //console.log(req.files[0]);

  var des_file= __dirname+"/"+req.files[0].originalname;
  fs.readFile(req.files[0].path, function(err,data){
    fs.writeFile(des_file,data,function(err){
      if(err){
        console.log(err);
      }else{
        docCon.documentConvert(des_file,res);
      }
    });
  });
});
module.exports = router;
