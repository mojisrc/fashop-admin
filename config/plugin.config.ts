import { IPlugin } from 'umi-types';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
      },
      locale: {
        enable: true,
        default: 'zh-CN',
        baseNavigator: true
      },
      dynamicImport: {
        loadingComponent: './components/page-loading/index',
        webpackChunkName: true,
        level: 3
      },
      dll: {
        exclude: [],
        include: [
          'dva',
          'dva/router',
          'dva/saga'
        ]
      }
    }
  ]
];

export default plugins;
