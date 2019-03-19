import { IConfig } from 'umi-types';
import plugins from './plugin.config';
import routes from './router.config';
import themeConfig from './theme.config';
import serverConfig from './server.config';

const { SERVER_ENV } = process.env;

const umiConfig: IConfig = {
  plugins,
  targets: {
    ie: 11
  },
  define: {
    BASE_URL: serverConfig[SERVER_ENV] || serverConfig.development
  },
  routes,
  theme: themeConfig,
  ignoreMomentLocale: true,
  disableCSSModules: true
};

export default umiConfig;
