/**
 * Created by liyang on 16/8/27.
 */

import  User_router from  "koa-router"

const user_router   = new User_router()

user_router.get("/",async (ctx,next) => {

    await ctx.render("users.html")

});


export default user_router