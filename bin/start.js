/**
 * Created by liyang on 16/8/24.
 */
const current_path = process.cwd();
const runkoa = require('runkoa')
const path = require('path')
runkoa(path.join(current_path,'index.js'))//mark不能省略后缀.js