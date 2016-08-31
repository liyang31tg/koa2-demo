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
const logger        = require('koa-logger')
const onerror       = require('koa-onerror')


const users         = require('./routes/users')
const indexR        = require('./routes/index')
//开启日志服务
app.use(logger())
onerror(app)
//开启public的静态服务
app.use(convert(staticserver(__dirname + "/public")))
//app.use(convert(router))
app.use(convert(views(__dirname + '/views', { map: {html: 'nunjucks' }})))


router.use('/index',indexR.routes(),indexR.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

router.get("/",async (ctx,next) => {
    await ctx.render("parent.html",{items:[{ title: "foo", id: 1 }, { title: "bar", id: 2}],foods:{
        'ketchup': '5 tbsp',
        'mustard': '1 tbsp',
        'pickle': '0 tbsp'
    }})
});



app
    .use(router.routes())
    .use(router.allowedMethods());



app.listen(3001)