/**
 * Created by elvischen on 22/03/2017.
 */
var http = require("http"),
    mongoose = require('mongoose'),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    request = require("request");

mongoose.connect('mongodb://localhost/IFE');

// 添加数据库连接失败和打开时的回调
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('mongoose connected!')
});

// 定义一个Schema
var resultSchema = new mongoose.Schema({
    code: Number,
    msg: String,
    word: String,
    device: String,
    datalist: [{
        info: String,
        link: String,
        pic: String,
        title: String
    }]
});

// 编译定义好的Schema
var Result = mongoose.model('Result', resultSchema);

var proxy = http.createServer(function(reqst, response) {
    var req = reqst.url;
    console.log(req);



    if (req == "/" || req == "/favicon.ico") {
        req = "/index.html";
    }

    if ( req[1] === "?") {
        console.log('request received');
        var query = url.parse(req, true).query;
        console.log(query);
        var cmdStr = 'phantomjs task.js ';
        require("child_process").exec(cmdStr + query.word + ' ' + query.device,
            function (error, stdout, stderr) {
                if (error) {
                    console.error(`exec error: ${error}`);
                } else {
                    console.log("Result GET successfully");
                    var stdobj = JSON.parse(stdout);
                    saveImg(stdobj);
                    var result = new Result(stdobj);
// 将文档保存到数据库
                    result.save(function(err, result) {
                        if (err) {
                            console.error("Save error," + err);
                        } else {
                            console.log("Result GET successfully");
                            response.writeHeader(200, {"Content-Type": "application/json"});
                            response.write(stdout);
                            response.end();
                        }
                    });

                }
            });
    }
    else {
        var fileUrl = "." + req;
        var extname = path.extname(req);

        switch (extname) {
            case ".html":
                response.writeHeader(200, {"Content-Type": "text/html"});
                break;
            case ".png":
                response.writeHeader(200, {"Content-Type": "image/png"});
                break;
            default:
                console.log("Other file types");
        }
        fs.readFile(fileUrl, function (err, data) {
            if (err) {
                throw err;
            }
            else {
                response.write(data);
                console.log(fileUrl + " loaded");
                response.end();
            }
        });
    }
}).listen(8888);

console.log('server started');

function saveImg(obj) {
    var datalist = obj.datalist;
    var j = 0;
    for (let i in datalist){
        var picUrl = datalist[i].pic;
        if (picUrl !== "" ){
            request(picUrl).pipe(fs.createWriteStream(i + ".png"));
            j++;
        }
    }
    console.log(j + " images saved");
}