// ([\w|\d|\*]+\/[\w|*]+)|\* 过滤 ( goods/*  && goods/list) || goods/info  && goods/info || *
require("../src/utils/policy/index")
let string  = '( goods/*  && !goods/list) || goods/info  && goods/info && goods/infoXx || *';
var patt = /([\w|\d|\*]+\/[\w|*]+)|\*/g;
let matchList = string.match(patt);

matchList.map((item)=>{
    string=string.replace(/([\w|\d|\*]+\/[\w|*]+)|\*/,item === 'goods/info' ? "true" : "false");//把'is'替换为空字符串
})

console.log(matchList,string)

console.log(!false)
