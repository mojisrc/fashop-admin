export const plugins = [
  ['umi-plugin-react', {
    antd: true,
    dva: {
      hmr: true,
    },
    locale: {
      enable: true,
      default: 'zh-CN',
      baseNavigator: true,
    },
    dynamicImport: {
      loadingComponent: './components/page-loading/index',
      webpackChunkName: true,
      level: 3,
    },
    dll: {
      exclude: [],
      include: ['dva', 'dva/router', 'dva/saga']
    }
  }]
];
