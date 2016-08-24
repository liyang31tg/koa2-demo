/**
 * Created by liyang on 16/8/24.
 */
const Koa           = require('koa')
const app           = new Koa()
const convert       = require('koa-convert')
const staticserver  = require("koa-static")

//开启public的静态服务
console.log(__dirname);
app.use(convert(staticserver(__dirname + "/public")))

// response
app.use(ctx => {
    ctx.body = 'Hello Koadd'
})

app.listen(3000)