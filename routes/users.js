/**
 * Created by liyang on 16/8/27.
 */
const user_router = require("koa-router")()
user_router.get("/",async (ctx,next) => {

    await ctx.render("users.html")

});

module.exports = user_router;