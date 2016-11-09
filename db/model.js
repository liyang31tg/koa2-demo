import fs from 'fs'
import db from './db'
const files = fs.readdirSync(__dirname + '/models');
const js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);
var exp = {}
for (var f of js_files) {
    const name = f.substring(0, f.length - 3);
    const fpath =  __dirname + '/models/' + f;
    const tmpO = require(fpath);
    exp[name] = tmpO   
}
exp["sync"] = () => {
    return db.sync();
}
export default exp