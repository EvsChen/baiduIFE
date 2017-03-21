/**
 * Created by elvischen on 21/03/2017.
 */
var page = require('webpage').create(),
    system = require('system'),
    t, keyword, address;

if (system.args.length === 1) {
    console.log('Usage: task.js <keyword>');
    phantom.exit();
}

t = Date.now();
keyword = system.args[1];
address = "https://www.baidu.com/s?wd=" + keyword;
page.open(address, function(status) {
    var obj = new Object();
    obj.word = keyword;
    if (status !== 'success') {
        obj.code = 0;
        obj.msg = "抓取失败";
        console.log(JSON.stringify(obj));
    }
    else {
        t = Date.now() - t;
        obj.code = 1;
        obj.msg = "抓取成功";
        obj.time = t;
        var ua = page.evaluate(function () {
            var res = document.getElementsByClassName("result");
            var datalist  = [];
            for (var i = 0; i < res.length; i++){
                var data = new Object();
                data.title = res[i].firstChild.firstChild.innerText;
                data.info = res[i].getElementsByClassName("c-abstract")[0].innerText;
                data.link = res[i].firstChild.firstChild.href;
                var picdiv = res[i].getElementsByTagName("img")[0];
                if (picdiv) {
                    data.pic = picdiv.src;
                }
                else{
                    data.pic = "";
                }
                datalist.push(data);
            }
            return datalist;
        })
        obj.datalist = ua;
        console.log(JSON.stringify(obj));
    }
    phantom.exit();
});