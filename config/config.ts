import { plugins } from './plugin.config';
import pageRoutes from './router.config';
import themeConfig from './theme.config';
import serverConfig from './server.config';

const { SERVER_ENV } = process.env;

export default {
  plugins,
  targets: {
    ie: 11
  },
  define: {
    BASE_URL: serverConfig[SERVER_ENV]
  },
  // 路由配置
  routes: pageRoutes,
  theme: themeConfig,
  ignoreMomentLocale: true,
  disableCSSModules: true
}
