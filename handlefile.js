import fs from 'fs'
/**
 * 这个中间件已经上传到npm了，貌似koa2还不支持中间件是es6的语法，，所以啦你懂的，暂时不能用啦
 * 
 * 
 * 
 * 
 * 
 * @param  {[type]} path1 [description]
 * @return {[type]}       [description]
 */
function aa(path1) {
    return async(ctx, next) => {
        const files = ctx.request.files
        if (files != null && files.length > 0) {
            for (let file of files) {
                const fPath = file.path
                const fPaths = fPath.split("/")
                const fName = file.name
                const fNames = file.name.split(".")
                const tmpTmpName = fPaths[fPaths.length - 1] + "." + fNames[fNames.length - 1]
                const result = await new Promise((resolve, reject) => {
                    fs.readFile(fPath, (err, data) => {
                        if (err) {
                            console.log("错误处理")
                            reject({ status: 1, message: "文件读取失败" })
                        }
                        const current_path = process.cwd()
                        let tmpPP = "/public/file/upload"
                        if (path1 != null){
                            console.log("tesf")
                            tmpPP = path1
                        }
                        const path = current_path + tmpPP
                        fs.writeFile(path + "/" + tmpTmpName, data, err => {
                            if (err) {
                                console.log("错误处理")
                                reject({ status: 1, message: "文件写入失败" })
                            }
                            fs.unlink(fPath, err => {
                                if (err) {
                                    console.log("错误处理")
                                    reject({ status: 1, message: "原来文件删除失败" })
                                }
                                console.log("文件操作成功")
                                resolve({ status: 0, message: "文件操作成功" })

                            })
                        })
                    })
                })
                if (result.status != 0) {
                    console.log("错误处理")
                    ctx.throw(result.message)

                }

            }
        }
        await next()
    }
}

export default aa
