/**
 * Created by qinyj on 6/24/2016.
 */
var mongoose=require('../configs/db').mongoose;
var schema=new mongoose.Schema({
    name:'string',
    password:'string'
});
var User=mongoose.model('User',schema);
module.exports=User;