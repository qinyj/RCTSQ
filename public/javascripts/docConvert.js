/**
 * Created by qinyj on 8/11/2016.
 */
var File=require('../../configs/file');
//var user=require('../../configs/user');
var dateNow=require('./dateNow');
function documentConvert(_uploadFile,res){

    var watson = require('watson-developer-cloud');
    var fs = require('fs');

    var document_conversion = watson.document_conversion({
        "version": "v1",
        "version_date": "2015-12-15",
        "password": "nHTkOhRDy87K",
        "username": "4dbb36f8-8035-40e5-95a3-6c8fb4ad9a03"
    });
    // convert a document
    document_conversion.convert({
        // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
        file: fs.createReadStream(_uploadFile),
        conversion_target: document_conversion.conversion_target.NORMALIZED_TEXT,
        // Add custom configuration properties or omit for defaults
        word: {
            heading: {
                fonts: [
                    { level: 1, min_size: 24 },
                    { level: 2, min_size: 16, max_size: 24 }
                ]
            }
        }
    }, function (err, response) {
        if (err) {
            console.error(err);
        } else {
            //console.log(JSON.stringify(response, null, 2));
            //res.write( response );
            //response.write( JSON.stringify( response ) );
            var filepath=_uploadFile;
            var newfile=new File({
                user: loginuser,
                tsp:dateNow,
                title:filepath.substr(filepath.search("/")+1),
                document: response
            })
            newfile.save(function (err) {
                if(err){
                    console.log(err.message);
                    message='convert failed';
                    return res.redirect('/upload');
                }
                console.log("convert successfully");
                res.redirect('/user');
            })
            userdoc=response;
        }
    });
}
exports.documentConvert = documentConvert;