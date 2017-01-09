var http = require('http');
var url = require('url');
var qs = require('querystring');
http.createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var resultData = '';
    var query = url.parse(req.url).query;
    console.info();
    var qs_parse = qs.parse(query);
    console.info(qs_parse.myUrl);
    console.info();
    http.get(qs_parse.myUrl,function (resquest) {
        resquest.setEncoding('utf8');
        resquest.on('data',function (result) {
            console.log(result);
            console.info();
            resultData += result;
        });
        resquest.on('end',function () {
            var str = '';
            if (qs_parse.callback){
                str =  qs_parse.callback + '(' + JSON.stringify(resultData) + ')';//jsonp
            }else {
                str = JSON.stringify(resultData);
            }
            res.write(JSON.parse(str));
            res.end();
        })
    }).on('error',function (e) {
        console.log(e.message);
    })

}).listen(3000);
console.log("HTTP server is listening at port 3000.");