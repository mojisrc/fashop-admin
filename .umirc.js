import fs from "fs";
import pageRoutes from "./config/router.config";
import webpackPlugin from "./config/plugin.config";
import defaultSettings from "./src/defaultSettings";
import { defineConfig, utils } from "umi";

const { winPath } = utils;

// 默认接口地址
var host = "http://127.0.0.1:9510";
// 默认根目录
var base = "";
// 为了build后部署时不折腾nginx的try_files
var history = "hash";

// .umirc.js当做fashop的默认配置，.build.js是为了方便在本地编译生产环境下的配置
if (fs.existsSync(".build.js")) {
    const build = require("./.build.js");
    if (build["host"] !== "undefined") {
        host = build.host;
    }
    if (build["base"] !== "undefined") {
        base = build.base;
    }
    if (build["history"] !== "undefined") {
        history = build.history;
    }
}

export default defineConfig({
    hash: true,
    base: base,
    publicPath: base,
    antd: {},
    dva: {
        skipModelValidate: true,
        hmr: true,
        immer: true
        // 注：如需兼容 IE11，需配置 { immer: { enableES5: true }}。
    },
    locale: {
        default: "zh-CN", // default zh-CN
        baseNavigator: false, // default true, when it is true, will use `navigator.language` overwrite default
        antd: false
    },
    targets: {
        chrome: 79,
        firefox: false,
        safari: false,
        edge: false,
        ios: false
    },
    dynamicImport: {
        loading: "@/components/pageLoading/index"
    },
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
        },
        "process.env.base": history === "hash" ? base + "#/" : base
    },
    // 路由配置
    routes: pageRoutes,
    // Theme for antd
    // https://ant.design/docs/react/customize-theme-cn
    theme: {
        "primary-color": defaultSettings.primaryColor,
        "layout-header-background": "#000",
        "menu-bg": "#000",
        "menu-dark-bg": "#000",
        "menu-dark-submenu-bg": "#151515"
    },
    /**
     * 部署（build）模式下无效，仅供开发环境下
     */
    proxy: {
        "/admin": {
            target: host,
            changeOrigin: true,
            pathRewrite: { "^/admin": "/admin" },
            secure: false
        }
    },
    ignoreMomentLocale: true,
    inlineLimit: 1,
    // 暂时关闭
    pwa: false,
    lessLoader: {
        javascriptEnabled: true
    },
    crossorigin: true,
    cssLoader: {
        localsConvention: "camelCase",
        modules: {
            getLocalIdent: (context, _, localName) => {
                if (
                  context.resourcePath.includes("node_modules") ||
                  context.resourcePath.includes("ant.design.pro.less") ||
                  context.resourcePath.includes("global.less")
                ) {
                    return localName;
                }
                const match = context.resourcePath.match(/src(.*)/);
                if (match && match[1]) {
                    // css的防冲突 以文件位置来索引
                    if (match[1].includes(".css")) {
                        const antdProPath = match[1].replace(".css", "");
                        const arr = winPath(antdProPath)
                          .split("/")
                          .map((a) => a.replace(/([A-Z])/g, "-$1"))
                          .map((a) => a.toLowerCase());
                        return `${arr.join("-")}-${localName}`.replace(/--/g, "-");
                    }
                    // less的防冲突 以文件位置来索引
                    const antdProPath = match[1].replace(".less", "");
                    const arr = winPath(antdProPath)
                      .split("/")
                      .map((a) => a.replace(/([A-Z])/g, "-$1"))
                      .map((a) => a.toLowerCase());
                    return `antd-pro${arr.join("-")}-${localName}`.replace(/--/g, "-");
                }
                return localName;
            }
        }

    },
    manifest: {
        basePath: "/"
    },
    chainWebpack: webpackPlugin,
    // 引入被 external 库的 scripts
    // 区分 development 和 production，使用不同的产物
    scripts: process.env.NODE_ENV === "development" ? [
        "https://cdn.jsdelivr.net/npm/react@16.14.0/umd/react.development.min.js",
        "https://cdn.jsdelivr.net/npm/react-dom@16.14.0/umd/react-dom.development.min.js",
        "https://cdn.jsdelivr.net/npm/react-dom@16.14.0/umd/react-dom-server.browser.development.js",
    ] : [
        "https://gw.alipayobjects.com/os/lib/react/16.14.0/umd/react.production.min.js",
        "https://gw.alipayobjects.com/os/lib/react-dom/16.14.0/umd/react-dom.production.min.js",
        "https://gw.alipayobjects.com/os/lib/react-dom/16.14.0/umd/react-dom-server.browser.production.min.js",
    ],
    externals: {
        "react": "window.React",
        "react-dom": "window.ReactDOM",
    },
    devtool: 'eval',
    esbuild: {},
});
