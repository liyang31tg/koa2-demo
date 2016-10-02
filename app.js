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
import users       		 	 from './routes/users'
import indexR      	 		 from './routes/index'

const app           = new Koa()
const router        = new Router()
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