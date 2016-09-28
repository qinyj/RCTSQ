/**
 * Created by qinyj on 6/24/2016.
 */
var mongoose=require('mongoose');
mongoose.connect('mongodb://rctsusr:rctspwd@169.50.117.136:27017/rctsdb');
var db=mongoose.connection;
//get notify if connect successfully or if a connection error occurs
db.on('error',console.error.bind(console,'connection error:'));
module.exports={
    "dbCon":db,
    "mongoose":mongoose
};