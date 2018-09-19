const path = require('path');
const fs = require('fs');
let  join = require('path').join;


const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


function getPagesFileEntry(startPath) {
    let result={};
    function finder(path) {
        const files=fs.readdirSync(path);
        files.map((value) => {
            const fPath=join(path,value);
            const fStats=fs.statSync(fPath);
            if(fStats.isDirectory()&&value!=='bundle'){
                const filesArray = fs.readdirSync(`${startPath}/${value}`);
                filesArray.map((e)=>{
                    if(e.includes('.js')){
                        const fileName = `${value}${e}`
                        const entryKey = fileName.slice(0,-3)
                        const entryValue = resolveApp(`${startPath}/${value}/${e}`)
                        result[entryKey] =entryValue
                    }
                })
            }
        })
    }
    finder(startPath);
    return result;
}

// let fileNames=findSync(resolveApp('src/pages'));
module.exports = {
    getPagesFileEntry
}
