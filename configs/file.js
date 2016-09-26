/**
 * Created by qinyj on 6/30/2016.
 */
var mongoose=require('../configs/db').mongoose;
var schema=new mongoose.Schema({
    user:'string',
    tsp:'string',
    title:'string',
    document:'string'
});
var File=mongoose.model('File',schema);
module.exports=File;