const  appindex = require("koa-router")()


appindex.get("/", (ctx,next)=>{

	 ctx.body = {"body":"rewrwe"}
})



module.exports = appindex

