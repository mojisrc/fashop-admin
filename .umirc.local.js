// const host = "https://v2-api.fashop.cn"
const host = "http://127.0.0.1:9511"
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
};
