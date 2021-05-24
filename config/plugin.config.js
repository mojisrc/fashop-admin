import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

export default (memo, { env, webpack, createCSSRule }) => {
    memo.resolve.alias.set('react-native$', 'react-native-web');
    memo.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin);

    // https://umijs.org/zh-CN/guide/boost-compile-speed
    memo.merge({
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                minChunks: 3,
                automaticNameDelimiter: '.',
                cacheGroups: {
                    vendor: {
                        name: 'vendors',
                        test({ resource }) {
                            return /[\\/]node_modules[\\/]/.test(resource);
                        },
                        priority: 10,
                    },
                },
            },
        }
    });
};
