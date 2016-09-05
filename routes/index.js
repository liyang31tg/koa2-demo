/**
 * Created by liyang on 16/8/31.
 */

const  indexRouter = require("koa-router")()

/**
 * 普通代码实现的瀑布流
 * @param  {[type]} "/warterfall" [description]
 * @param  {[type]} async         (ctx,next     [description]
 * @return {[type]}               [description]
 */
indexRouter.get("/warterfall",async (ctx,next)=>{
    const itemss = []
    for (let i = 0 ; i < 98; i ++){

        itemss.push(i)

    }
    await ctx.render("warterfall.html",{items:itemss})
});
/**
 * 跳转到jquery实现的瀑布流
 * @param  {[type]} "/jWarterfall" [description]
 * @param  {[type]} async          (ctx,next     [description]
 * @return {[type]}                [description]
 */
indexRouter.get("/jWarterfall",async (ctx,next)=>{

	const itemss = []
    for (let i = 0 ; i < 20; i ++){

        itemss.push(i)

    }
    await ctx.render("jwarterfall.html",{items:itemss})

})
/**
 * 极客学院G code 页面的实现
 * 
 * @param  {[type]} "/jikexueyuanGCodeView" [description]
 * @param  {[type]} async                   (ctx,next     [description]
 * @return {[type]}                         [description]
 */
indexRouter.get("/jikexueyuanGCodeView",async (ctx,next)=>{

	
    await ctx.render("jikexueyuanGCodeView.html")

})

/**
 * 极客学院视频播放页面的实现
 * 
 * @param  {[type]} "/jikexueyuanGCodeView" [description]
 * @param  {[type]} async                   (ctx,next     [description]
 * @return {[type]}                         [description]
 */
indexRouter.get("/jikexueyuanhandleVideo",async (ctx,next)=>{

    
    await ctx.render("jikexueyuan/handleVideo.html")

})
/**
 * 极客学院路径页面的布局实现
 * @param  {[type]} "/jikexueyuanstrudypath" [description]
 * @param  {[type]} async                    (ctx,next     [description]
 * @return {[type]}                          [description]
 */
indexRouter.get("/jikexueyuanstrudypath",async (ctx,next)=>{

    await ctx.render("jikexueyuan/jikexueyuanstrudypath.html")

})

/**
 * tab切换
 * 
 * @param  {[type]} "/jikexueyuanstrudypath" [description]
 * @param  {[type]} async                    (ctx,next     [description]
 * @return {[type]}                          [description]
 */
indexRouter.get("/tabswich",async (ctx,next)=>{

    await ctx.render("jikexueyuan/tapSwich.html")

})
/**
 * jquery 测试
 * @param  {[type]} "/testjq" [description]
 * @param  {[type]} async     (ctx,next     [description]
 * @return {[type]}           [description]
 */
indexRouter.get("/testjq",async (ctx,next)=>{

    await ctx.render("testJQ.html")

})
/**
 * jq weui 的测试演示使用
 * @param  {[type]} "/testjq" [description]
 * @param  {[type]} async     (ctx,next     [description]
 * @return {[type]}           [description]
 */
indexRouter.get("/testjqweui",async (ctx,next)=>{
    let griddatas = []
    let titles = [
                    {
                     title:"按钮",
                     url:"/views/weui-buttons.html"
                    },
                    {
                     title:"列表",
                     url:"/views/weui-normalTable.html"
                    },
                    {
                     title:"表单",
                     url:"/views/weui-form.html"
                    },
                    {
                     title:"消息",
                     url:"/views/weui-msg.html"
                    },
                    {
                     title:"进度条",
                     url:"/views/weui-progress.html"
                    },
                    {
                     title:"提示框",
                     url:"/views/weui-dialog.html"
                    },
                    {
                     title:"bottomTabbar",
                     url:"/views/weui-tabbar.html"
                    },
                    {
                     title:"下啦刷新",
                     url:"/views/weui-pull2Refresh.html"
                    },
                    {
                     title:"栅格",
                     url:"/views/weui-col.html"
                    },
                    {
                      title:"photoBrowser",
                      url:"/views/photoBrowser.html"
                    }
                    ]
    for (let i = 0 ;i<titles.length; i++){
        let m = {
                img:i+".jpg",
                 content:titles[i].title,
                 url:titles[i].url
                }
        griddatas.push(m)

    }

    let datas = {
            griddata:griddatas
            
        }

    await ctx.render("weui/weui-index.html",{
        data: datas
    })

})




module.exports = indexRouter
