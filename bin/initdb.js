const path = require('path')
const tmpPath = path.join(process.cwd(),'db','initdb.js')
const runkoa = require('runkoa')

runkoa(tmpPath)