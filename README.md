<p align="center">
  <a href="https://www.fashop.cn">
    <img width="150" src="https://www.fashop.cn/logo.png">
  </a>
</p>

<h2 align="center">FaShop Admin</h1>

<div align="center">
微信小程序商城后台，微信小程序微店后台
</div>

![](https://img.shields.io/github/stars/mojisrc/fashop-admin.svg)
![](https://img.shields.io/github/issues/mojisrc/fashop-admin.svg)
![](https://img.shields.io/github/forks/mojisrc/fashop-admin.svg)

**请注意：本分支开发语言为typescript**

## 开发

* 克隆或下载项目到本地
* 安装NodeJS
* 安装项目依赖 项目根目录下执行`npm run bootstrap`
* 开发 项目根目录下执行`npm run start`

## 编译

> 提供build:test、build:prod两个编译命令、可结合CI使用

请在 config/server.config.ts中配置各个环境的API地址

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

