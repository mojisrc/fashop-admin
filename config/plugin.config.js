import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

export default (memo, { env, webpack, createCSSRule }) => {
    memo.resolve.alias.set('react-native$', 'react-native-web');
    memo.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin);

    // https://umijs.org/zh-CN/guide/boost-compile-speed
    memo.merge({
        optimization: {
            splitChunks: {
                chunks: 'all',
                // 约30kb
                minSize: 30000,
                // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
                minChunks: 3,
                // 表示拆分出的chunk的名称连接符。
                automaticNameDelimiter: '.',
                cacheGroups: {
                    vendor: {
                        name: 'vendors',
                        test: /^.*node_modules[\\/](?!ag-grid-|lodash|wangeditor|react-virtualized|rc-select|rc-drawer|rc-time-picker|rc-tree|rc-table|rc-calendar|antd|react-color|draft-convert|draft-js|braft-editor|@ant-design\/compatible).*$/,
                        chunks: "all",
                        priority: 10,
                    },
                    virtualized: {
                        name: "virtualized",
                        test: /[\\/]node_modules[\\/]react-virtualized/,
                        chunks: "all",
                        priority: 10
                    },
                    rcselect: {
                        name: "rc-select",
                        test: /[\\/]node_modules[\\/]rc-select/,
                        chunks: "all",
                        priority: 10
                    },
                    rcdrawer: {
                        name: "rcdrawer",
                        test: /[\\/]node_modules[\\/]rc-drawer/,
                        chunks: "all",
                        priority: 10
                    },
                    rctimepicker: {
                        name: "rctimepicker",
                        test: /[\\/]node_modules[\\/]rc-time-picker/,
                        chunks: "all",
                        priority: 10
                    },
                    ag: {
                        name: "ag",
                        test: /[\\/]node_modules[\\/]ag-grid-/,
                        chunks: "all",
                        priority: 10
                    },
                    antd: {
                        name: "antd",
                        test: /[\\/]node_modules[\\/]antd[\\/]/,
                        chunks: "all",
                        priority: 9
                    },
                    rctree: {
                        name: "rctree",
                        test: /[\\/]node_modules[\\/]rc-tree/,
                        chunks: "all",
                        priority: -1
                    },
                    rccalendar: {
                        name: "rccalendar",
                        test: /[\\/]node_modules[\\/]rc-calendar[\\/]/,
                        chunks: "all",
                        priority: -1
                    },
                    rctable: {
                        name: "rctable",
                        test: /[\\/]node_modules[\\/]rc-table[\\/]es[\\/]/,
                        chunks: "all",
                        priority: -1
                    },
                    lodash: {
                        name: "lodash",
                        test: /[\\/]node_modules[\\/]lodash[\\/]/,
                        chunks: "all",
                        priority: -2
                    },
                    reactcolor: {
                        name: "reactcolor",
                        test: /[\\/]node_modules[\\/]react-color[\\/]/,
                        chunks: "all",
                        priority: -2
                    },
                    draftconvert: {
                        name: "draftconvert",
                        test: /[\\/]node_modules[\\/]draft-convert[\\/]/,
                        chunks: "all",
                        priority: -2
                    },
                    draftjs: {
                        name: "draftjs",
                        test: /[\\/]node_modules[\\/]draft-js[\\/]/,
                        chunks: "all",
                        priority: -2
                    },
                    brafteditor: {
                        name: "brafteditor",
                        test: /[\\/]node_modules[\\/]braft-editor[\\/]/,
                        chunks: "all",
                        priority: -2
                    },
                    antdcompatible: {
                        name: "antdcompatible",
                        test: /[\\/]node_modules[\\/]@ant-design\/compatible[\\/]/,
                        chunks: "all",
                        priority: 10
                    },
                }

            },
        }
    });
};
