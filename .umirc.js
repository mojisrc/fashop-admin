import os from "os";
import fs from "fs";
import pageRoutes from "./config/router.config";
import webpackPlugin from "./config/plugin.config";
import defaultSettings from "./src/defaultSettings";

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

const plugins = [
    [
        "umi-plugin-react",
        {
            antd: true,
            dva: {
                hmr: true
            },
            locale: {
                enable: true, // default false
                default: "zh-CN", // default zh-CN
                baseNavigator: true // default true, when it is true, will use `navigator.language` overwrite default
            },
            dynamicImport: {
                loadingComponent: "./components/pageLoading/index"
            },
            pwa: {
                workboxPluginMode: "InjectManifest",
                workboxOptions: {
                    importWorkboxFrom: "local"
                }
            },
            routes: {
                exclude: [/\.test\.(j|t)sx?$/]
            },
            ...(!process.env.TEST && os.platform() === "darwin"
              ? {
                  dll: {
                      include: ["dva", "dva/router", "dva/saga", "dva/fetch"],
                      exclude: ["@babel/runtime"]
                  },
                  hardSource: false
              }
              : {})
        }
    ]
];

export default {
    history: "hash",
    base: base,
    publicPath: base,
    // add for transfer to umi
    plugins,
    targets: {
        ie: 11
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
    externals: {
        "@antv/data-set": "DataSet"
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
        },
        "/install/installer": {
            target: host,
            changeOrigin: true,
            pathRewrite: { "^/install/installer": "/install/installer" },
            secure: false
        }
    },
    ignoreMomentLocale: true,
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    disableRedirectHoist: true,
    cssLoaderOptions: {
        modules: true,
        getLocalIdent: (context, localIdentName, localName) => {
            if (
              context.resourcePath.includes("node_modules") ||
              context.resourcePath.includes("ant.design.pro.less") ||
              context.resourcePath.includes("global.less")
            ) {
                return localName;
            }
            const match = context.resourcePath.match(/src(.*)/);
            if (match && match[1]) {
                const antdProPath = match[1].replace(".less", "");
                const arr = antdProPath
                  .split("/")
                  .map(a => a.replace(/([A-Z])/g, "-$1"))
                  .map(a => a.toLowerCase());
                return `antd-pro${arr.join("-")}-${localName}`.replace(/--/g, "-");
            }
            return localName;
        }
    },
    manifest: {
        basePath: "/"
    },

    chainWebpack: webpackPlugin
};
