## 安装
`yarn`

## 运行
`yarn run start`


## 本地环境配置
> 创建.umirc.local.js，该文件不会提交到git，以免影响其他人的本地测试环境配置

内容如下：
```js
const host = "https://v3.fashop.cn"
// const host = "http://127.0.0.1:9511"
export default {
    define: {
        APP_TYPE: process.env.APP_TYPE || "",
        "process.env.dev": {
            websocket: {
                host: host.replace("http", "ws")
            }
            // 开发环境下的api走proxy
        },
        "process.env.production": {
            websocket: {
                host: host.replace("http", "ws")
            },
            api: {
                url: host
            }
        }
    },
};


```

## webstorm解决alias不能索引到文件的偏方，创建webpack.config.js
```js
module.exports = {
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src/'),
        }
    }
};


```

## commit-message规范

> 参考: [my-commit-message](https://yanhaijing.com/git/2016/02/17/my-commit-message/)

格式:

Header必填，Body和Footer选填。

```
<Header>

<Body>

<Footer>
```

### Header

Header部分只有一行，包括：type（必填）、scope（选填）和subject（必填）

```
<type>(<scope>): <subject>
```

**type**

type用于说明 commit 的类别，可使用如下类别

* feat 新功能
* fix BUG修复
* docs 文档
* style 格式(不影响代码运行的变动)
* refactor 重构
* test 测试相关
* chore 构建过程或辅助工具的变动
* revert 还原代码

**scope**

scope用于説明 commit 影响范围

**subject**

subject是 commit 目的的简短描述

### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。

### Footer

Footer 部分只用于两种情况：

* 关联issue 
* 关闭issue

示例：

```
// 关联
Issue #1, #2, #3
// 关闭
Close #1, #2, #3
```

### 完整示例

```
feat: 添加了XX功能

添加了XXXXXXX

- 添加功能1
- 添加功能2
- 添加功能3

Issue #1, #2
Close #1
```
