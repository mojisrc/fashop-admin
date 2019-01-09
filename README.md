<p align="center">
  <a href="https://www.fashop.cn">
    <img width="200" src="https://www.fashop.cn/logo.png">
  </a>
</p>

<h1 align="center">Fa Shop Admin</h1>

<div align="center">
微信小程序商城后台，微信小程序微店后台
</div>

![](https://img.shields.io/github/stars/mojisrc/fashop-admin.svg)
![](https://img.shields.io/github/issues/mojisrc/fashop-admin.svg)
![](https://img.shields.io/github/forks/mojisrc/fashop-admin.svg)

## 安装运行
```bash
npm install
npm start
```
- 如果没安装umi 请先安装
```bash
npm install umi -g
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

## 配置接口域名
修改根目录下 config/config.js 文件
```
proxy: {
  '/admin/': {
     target: 'https://demo.fashop.cn',
     changeOrigin: true,
  },
},
```
