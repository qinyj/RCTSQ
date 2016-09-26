/**
 * Created by qinyj on 7/7/2016.
 */
/*Get regist page. */
var express = require('express');
var crypto=require('crypto');
var router = express.Router();
var User=require('../configs/user');
var index=require('./index');

router.use(index);

router.get('/reg',isLogin);
router.get('/reg', function(req, res, next) {
    res.render('reg', { title: 'Regist' });
});
router.post('/reg',isLogin);
//click regist button
//liston on post request
router.post('/reg',function (req,res) {
    if(req.body.password!=req.body.passwordconf){
        regmsg='Passwords Are Not Identical';
        return res.redirect('/reg');
    }

    //md5 encryption
    //var md5=crypto.createHash('md5');
    //var password=md5.update(reg.body.password).digest('base64');
    var newUser=new User({
        name:req.body.userid,
        password:req.body.password
    });
    User.findOne({name:newUser.name},function(err,user){
        if(user){
            regmsg='user id existed';
        }
        if(err){
            regmsg=err;
            return res.redirect('/reg');
        }
        newUser.save(function(err){
            if(err){
                regmsg=err;
                return res.redirect('/reg');
            }
            req.session.user=newUser;
            console.log(req.session.user.name);
            loginuser=newUser.name;
            regmsg='';
            res.redirect('/');
        });
    });
});
function isLogin(req,res,next){
    if(req.session.user){
        console.log(req.session.user);
        user=req.session.user.name;
        return res.redirect('/');
    }
    next();
}
module.exports=router;