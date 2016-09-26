/**
 * Created by qinyj on 7/1/2016.
 */
var express = require('express');
var crypto=require('crypto');
var router = express.Router();
var User=require('../configs/user');
var index=require('./index');

router.use(index);
/*Get Login page. */
router.get('/login',isLogin);
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});
router.post('/login',isLogin);
router.post('/login',function (req,res){
    //var md5=crypto.createHash('md5');
    //var password=md5.update(req.body.password).digest('base64');
    password=req.body.password;
    User.findOne({name:req.body.userid},function(err,user){
        if(!user){
            loginmsg="User ID not exist";
            return res.redirect('/login');
        }
        if(user.password!=password){
            loginmsg="wrong password";
            return res.redirect('./login');
        }
        req.session.user=user;
        console.log(req.session.user.name);
        loginmsg='';
        loginuser=user.name;
        res.redirect('/user');
    });
});

router.get('/logout',function(reg,res){
    reg.session.user=null;
    loginuser='';
    res.redirect('/');
});
function isLogin(req,res,next){
    if(req.session.user){
        console.log(req.session.user);
        user=req.session.user.name;
        return res.redirect('/');
    }
    next();
}
module.exports = router;