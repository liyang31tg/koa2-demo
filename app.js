/**
 * Created by liyang on 16/8/24.
 */
import Koa from 'koa'
import views from 'koa-views'
import convert from 'koa-convert'
import staticserver from 'koa-static'
import Router from 'koa-router'
import logger from 'koa-logger'
import onerror from 'koa-onerror'
import mongo from 'koa-mongo'
import body from 'koa-better-body'
import Keygrip from 'keygrip'
// import handleffile from 'koa-handluploadfile'
import handleffile from './handlefile.js'
/**
 * 数据库mysql orm初始化
 */
import model from './db/model'


//private
import users from './routes/users'
import indexR from './routes/index'
import smallSoftwareRouter from './routes/smallSoftware'




const app = new Koa()
app.keys = new Keygrip(['im a newer secret', 'i like turtle'], 'sha256')

const router = new Router()
    //开启日志服务
    


app.use(async(ctx, next) => {
    console.log("加入前序逻辑1")
    await next()
    console.log("加入后续逻辑")
})

app.use(convert(new logger()))
// onerror(app)
app.use(convert(new body()))

app.use(handleffile("/public/file/upload/image"))

/**
 * 用来验证上面的文件处理时异步的，并且同步执行
 * @param  {[type]} (ctx, next          [description]
 * @return {[type]}       [description]
 */
app.use(async (ctx, next)=>{
   await next()
})






//开启public的静态服务
app.use(convert(staticserver(__dirname + "/public")))
    //app.use(convert(router))
app.use(convert(views(__dirname + '/views', { map: { html: 'nunjucks' } })))

/**
 * 数据库的使用配置
 * @type {String}
 */
/*
app.use(convert(mongo({
    uri: 'mongodb://localhost:27017/test', //or url
    max: 100,
    min: 1,
    timeout: 30000,
    log: false
})))
*/


router.use('/index', indexR.routes(), indexR.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use("/small", smallSoftwareRouter.routes(), smallSoftwareRouter.allowedMethods())

router.get("/", async ctx => {
    // var now = Date.now();
    // console.log(now)
    var dog = await model.user.create({
        email:"liyang200971@163.com",
        passwd: "123",
        name: "liyang",
        gender: true
    });
    // console.log('created: ' + JSON.stringify(dog));
    console.log(model.user)
    console.log(model.pet)

    var cat = await model.pet.create({
        name:'tom',
        age:26,
        sex:'13'
    });
    
    await ctx.render("parent.html")
})

router.post("/", async(ctx, next) => {
     var name = ctx.request.fields.name
     ctx.cookies.set("name",name,{signed:true})
     console.log(ctx.cookies.get("name"))
    await ctx.render("parent.html", {
        items: [{ title: "foo", id: 1 }, { title: "bar", id: 2 }],
        foods: {
            'ketchup': '5 tbsp',
            'mustard': '1 tbsp',
            'pickle': '0 tbsp'
        }
    })
});





app
    .use(router.routes())
    .use(router.allowedMethods());

//具体处理系统抛出的错误
app.on("error",(err,ctx)=>{

    console.log(err.status)
})

app.listen(3001)

export default app
