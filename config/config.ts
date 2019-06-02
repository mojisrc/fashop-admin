import routes from './router.config';
import plugins from './plugin.config';
import themeConfig from './theme.config';
import serverConfig from './server.config';

const { SERVER_ENV } = process.env;

export default {
  plugins,
  targets: {
    ie: 11
  },
  treeShaking: true,
  define: {
    BASE_URL: serverConfig[SERVER_ENV] || serverConfig.localhost
  },
  // 路由配置
  routes,
  hash: true,
  theme: themeConfig,
  ignoreMomentLocale: true,
  disableCSSModules: true
};
