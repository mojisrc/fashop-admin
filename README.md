# fashop-admin
微信小程序商城后台，微信小程序微店后台，接口基于FaShop

## 安装运行
```bash
npm install
npm start
```
- 如果没安装umi 请先安装
```bash
npm install umi -g
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
