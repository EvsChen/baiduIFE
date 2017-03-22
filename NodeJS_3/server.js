/**
 * Created by elvischen on 22/03/2017.
 */
var http = require("http");
var mongoose = require('mongoose');
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



var proxy = http.createServer(function(request, response) {
    console.log('request received');
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
    var req = request.url;
    if (req !== "/favicon.ico") {
        var query = require("url").parse(req, true).query;
        console.log(query);
        var cmdStr = 'phantomjs task.js ';
        require("child_process").exec(cmdStr + query.word + ' ' + query.device,
            function (error, stdout, stderr) {
                if (error) {
                    console.error(`exec error: ${error}`);
                } else {
                    // todo
                    console.log(stdout);
                    // 新建一个文档
                    var result = new Result(JSON.parse(stdout));

// 将文档保存到数据库
                    result.save(function(err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(result);
                        }
                    });

                }
        });
    }
}).listen(8888);
console.log('server started');
