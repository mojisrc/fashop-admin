import routes from './router.config';
import plugins from './plugin.config';
import themeConfig from './theme.config';
import serverConfig from './server.config';

const { SERVER_ENV } = process.env;

// 设置后端接口地址
let localServerConfig;
let BaseURL = '';

try {
  localServerConfig = require('./local-server.config.ts');
} catch (error) {}

if (serverConfig[SERVER_ENV]) {
  BaseURL = serverConfig[SERVER_ENV];
} else if (localServerConfig && localServerConfig.baseURL) {
  BaseURL = localServerConfig.baseURL;
} else {
  BaseURL = serverConfig.localhost;
}

export default {
  plugins,
  targets: {
    ie: 11,
  },
  treeShaking: true,
  define: {
    BASE_URL: BaseURL,
  },
  // 路由配置
  routes,
  hash: true,
  theme: themeConfig,
  ignoreMomentLocale: true,
  disableCSSModules: true,
  proxy: {
    '/admin': {
      target: 'https://v2-api.fashop.cn/admin/',
      changeOrigin: true,
      pathRewrite: { '^/admin': '' },
    },
  },
};
