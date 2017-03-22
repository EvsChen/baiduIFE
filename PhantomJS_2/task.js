/**
 * Created by elvischen on 21/03/2017.
 */
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    t, keyword, address,device;

if (system.args.length === 1) {
    console.log('Usage: task.js <keyword> <device>');
    phantom.exit();
}

t = Date.now();
keyword = system.args[1];
device = system.args[2];
address = "https://www.baidu.com/s?wd=" + keyword;
var deviceConfig = JSON.parse(fs.read('device.json'));

if (device in deviceConfig){
    page.settings.userAgent = deviceConfig[device].ua;
    page.viewportSize = {width: deviceConfig[device].width, height: deviceConfig[device].height};
}
else {
    console.log("This device is not supported");
    phantom.exit();
}

page.open(address, function(status) {
    var obj = new Object();
    obj.word = keyword;
    obj.device = device;
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
        var ls = page.evaluate(function () {
            var res = document.getElementsByClassName("result");
            var datalist  = [];
            for (var i = 0; i < res.length; i++){
                var data = new Object();
                var abstract = res[i].getElementsByClassName("c-abstract")[0];
                if (abstract != undefined){
                    data.info = abstract.innerText;
                }
                else {
                    data.info = "";
                }
                data.title = res[i].getElementsByTagName("a")[0].innerText;
                data.link = res[i].getElementsByTagName("a")[0].href;
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
        });
        obj.datalist = ls;
        console.log(JSON.stringify(obj));
    }
    phantom.exit();
});
