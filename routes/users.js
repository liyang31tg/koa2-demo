/**
 * Created by liyang on 16/8/27.
 */
const user_router = require("koa-router")()
user_router.get("/",async (ctx,next) => {

    await ctx.render("users")

});

module.exports = user_router;