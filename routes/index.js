/**
 * Created by liyang on 16/8/31.
 */

const  indexRouter = require("koa-router")()

indexRouter.get("/warterfall",async (ctx,next)=>{
    const itemss = []
    for (let i = 0 ; i < 98; i ++){

        itemss.push(i)

    }
    await ctx.render("warterfall.html",{items:itemss})
});

module.exports = indexRouter
