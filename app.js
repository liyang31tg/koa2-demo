/**
 * Created by liyang on 16/8/24.
 */
import Koa 					 from 'koa'
import views 				 from 'koa-views'
import convert 				 from 'koa-convert'
import staticserver 		 from 'koa-static'
import Router 				 from 'koa-router'
import logger       		 from 'koa-logger'
import onerror     			 from 'koa-onerror'
import mongo            from 'koa-mongo'

//private
import users       		 	 from './routes/users'
import indexR      	 		 from './routes/index'


import {KoaErr}				 from './help.js'

const app           = new Koa()
const router        = new Router()
//开启日志服务


app.use(async (ctx,next)=>{
	console.log("加入前序逻辑1")
	await next()
	console.log("加入后续逻辑")
})

/**
 * @param  {
 * 使用自定义错误
 * @return {[type]}
 */
app.use(async (ctx, next) => {
  ctx.Err = new KoaErr()
  await next()
})


app.use(new logger())
onerror(app)
//开启public的静态服务
app.use(convert(staticserver(__dirname + "/public")))
//app.use(convert(router))
app.use(convert(views(__dirname + '/views', { map: {html: 'nunjucks' }})))

/**
 * 数据库的使用配置
 * @type {String}
 */
app.use(convert(mongo({
  uri: 'mongodb://localhost:27017/test', //or url
  max: 100,
  min: 1,
  timeout: 30000,
  log: false
})))


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

export default app