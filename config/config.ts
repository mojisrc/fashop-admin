import { plugins } from './plugin.config';
import pageRoutes from './router.config';
import themeConfig from './theme.config';

export default {
  plugins,
  targets: {
    ie: 11
  },
  // 路由配置
  routes: pageRoutes,
  theme: themeConfig,
  ignoreMomentLocale: true,
  disableCSSModules: true
}
