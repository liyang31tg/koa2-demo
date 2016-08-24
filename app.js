/**
 * Created by liyang on 16/8/24.
 */
const Koa = require('koa')
const app = new Koa()

// response
app.use(ctx => {
    ctx.body = 'Hello Koadd'
})

app.listen(3000)