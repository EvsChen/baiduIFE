/**
 * Created by elvischen on 24/03/2017.
 */
const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const url = require("url");


app.use(serve('.'));

app.callback = function (){
    console.log(ctx.request);
};

app.listen(3000);

console.log('listening on port 3000');