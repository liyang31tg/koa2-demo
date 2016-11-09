
import path from 'path'
const tmpPath = path.join(process.cwd(),'db','model')
const model = require(tmpPath)
// process.env.NODE_ENV = 'production'
model.sync().then(function(){
	console.log("数据库初始化完成")
	process.exit(0)	
})

