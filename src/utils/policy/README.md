## 使用方法
```js
let policyData = {
                   "Statement": [
                     {
                       "Effect": "Allow",
                       "Action": [
                         "goods/*",
                         "goods/list"
                       ]
                     },
                     {
                       "Effect": "Allow",
                       "Action": [
                         "goods/*",
                         "goods/list"
                       ]
                     },
                     {
                       "Effect": "Allow",
                       "Action": [
                         "goods/*",
                         "goods/list"
                       ]
                     }
                   ]
                 };
// 实例化策略类
let policy = new Policy();
// 添加策略，数据结构根据服务器约定的规则来，policyData为一组FaShop标准示例
policy.addPolicy(policyData);
// 允许添加多组
policy.addPolicy(policyData);
// 验证某个节点是否有权限
policy.verify('goods/list');
```
