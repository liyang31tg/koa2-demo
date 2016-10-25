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
            var tmpFiles = []
                //过滤掉空文件
            for (let [index, file] of files.entries()) {
                const fSize = file.size
                if (fSize > 0) {
                    tmpFiles.push(file)
                }
                continue
            }
            ctx.request.files = tmpFiles
                //处理文件
            for (let file of tmpFiles) {
                const fSize = file.size
                console.log(typeof fSize)
                console.log(fSize instanceof Number)
                console.log(fSize)
                if (fSize <= 0) {
                    continue
                }
                const fPath = file.path
                const fPaths = fPath.split("/")
                const fName = file.name
                const fNames = file.name.split(".")
                const tmpTmpName = fPaths[fPaths.length - 1] + "." + fNames[fNames.length - 1]
                const result = await new Promise((resolve, reject) => {

                    fs.stat(fPath, (err, fileInfo) => {
                        if (err) {
                            const errorMsg = "文件读取失败"
                            console.log(errorMsg)
                            reject({ status: 1, message: errorMsg })
                            ctx.throw(errorMsg)
                            return
                        }

                        const current_path = process.cwd()
                        let tmpPP = "/public/file/upload"
                        if (path1 != null) {
                            tmpPP = path1
                        }
                        const path = current_path + tmpPP

                        const inputStream = fs.createReadStream(fPath)
                        const outputStream = fs.createWriteStream(path + "/" + tmpTmpName)
                        inputStream.pipe(outputStream)

                        inputStream.on("error", function() {
                            const errorMsg = "文件读取错误"
                            console.log(errorMsg)
                            reject({ status: 1, message: errorMsg })
                            ctx.throw(errorMsg)
                            return
                        })
                        outputStream.on("error", function() {
                            const errorMsg = "文件写入失败"
                            console.log(errorMsg)
                            reject({ status: 1, message: errorMsg })
                            ctx.throw(errorMsg)
                            return
                        })
                        outputStream.on("finish", function() {
                            fs.unlink(fPath, err => {
                                if (err) {
                                    const errorMsg = "原来文件删除失败"
                                    console.log(errorMsg)
                                    reject({ status: 1, message: errorMsg })
                                    ctx.throw(errorMsg)
                                    return
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
