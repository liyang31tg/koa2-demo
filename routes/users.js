/**
 * Created by liyang on 16/8/27.
 */

import User_router from "koa-router"
import UserAction from '../action/UserAction'

const user_router = new User_router()

user_router.get("/", async(ctx, next) => {



    const userAction = new UserAction();
    const user = await userAction.getUser(ctx);


    console.log(user)

    ctx.body = user


});


export default user_router
