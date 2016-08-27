/**
 * Created by liyang on 16/8/24.
 */
const Koa           = require('koa')
const app           = new Koa()
const views         = require('koa-views')
const convert       = require('koa-convert')
const staticserver  = require("koa-static")
const Router        = require("koa-router")
const router        = Router()


const users         = require('./routes/users');

//开启public的静态服务
app.use(convert(staticserver(__dirname + "/public")))
//app.use(convert(router))
app.use(convert(views(__dirname + '/views', {
    extension: 'html'
})))

// response
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//router.use('/users', users.routes(), users.allowedMethods());

router.get("/s",(ctx,next) => {

    ctx.body="shenm";
});

router.get('/', async  (ctx, next) => {

    await ctx.render("index",{});

});

app
    .use(router.routes())
    .use(router.allowedMethods());



app.listen(3001)