## 权限

```js
import Policy from "fashop-policy"

var policy =  new Policy
// 支持添加多组
policy.addPolicy({"Statement": [{"Action": ["user/*","goods/info"], "Effect": "Allow"}]})
policy.addPolicy({"Statement": [{"Action": ["user/*","goods/list"], "Effect": "Deny"}]})

if(policy.verify('goods/info') === true){
    // 有权限...
    // 执行.........
}else{
    // 不显示菜单
    // 或者显示占位信息
}

// 测试
policy.verify('goods/info').should.be.equal(true)
policy.verify('goods/list').should.be.equal(false)

// 验证表现层，用于多个权限同时验证，当都满足条件时才显示某个节点
let string  = '(( goods/*  && !goods/list) && goods/info  && goods/info && goods/infoXx) || * || goods/info';

policy.viewVerify(string)
```
