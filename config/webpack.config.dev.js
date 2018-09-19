'use strict';
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var InterpolateHtmlPlugin = require('interpolate-html-plugin');

const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');


const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = require(pkgPath)

const theme = pkg.theme;

module.exports = {
    devtool: 'cheap-module-source-map',
    mode: "development",
    entry: [
        require.resolve('./polyfills'),
        'react-hot-loader/patch',
        require.resolve('react-dev-utils/webpackHotDevClient'),
        paths.appIndexJs,
    ],
    output: {
        path: paths.appBuild,
        pathinfo: true,
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },

    module: {
        rules: [
            {
                test: /\.js$/, // 匹配所有js文件
                exclude: /node_modules/, // 排除掉node_modules这个文件夹的js文件
                loader: 'babel-loader', // 加载babel工具包
                options: { // 这里用options而不是query，虽然可以兼容，但是还是按照规则来吧
                    presets: ['env'] // 使用es6工具包
                }
            },
            {
                test: /\.html$/,
                use: [
                    // apply multiple loaders and options
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                            /* ... */
                        }
                    }
                ]
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(js|jsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [
                                ['import', [
                                    { libraryName: 'antd', style: true }
                                ]
                                ],
                                'transform-decorators-legacy',
                                'react-hot-loader/babel'
                            ],
                            compact: true,
                            presets: ["flow"],
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.css$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9',
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            },
                            {
                                loader: require.resolve('less-loader')
                            }
                        ],
                        exclude: [paths.appCssModules, paths.appComponentCssModules],
                    },
                    {
                        test: /\.css$/,
                        loader: 'style-loader!css-loader?modules',
                        include: [paths.appComponentCssModules, paths.appCssModules]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                }
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        autoprefixer({
                                            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                                        }),
                                    ],
                                },
                            },
                            require.resolve('less-loader')
                        ],
                        include: [paths.appComponentCssModules]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            require.resolve('style-loader'),
                            require.resolve('css-loader'),
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                    plugins: () => [
                                        autoprefixer({
                                            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                                        }),
                                    ],
                                },
                            },
                            {
                                loader: require.resolve('less-loader'),
                                options: {
                                    modifyVars: theme,
                                },
                            },
                        ],
                        exclude:[paths.appComponentCssModules]
                    },
                    {
                        test: /\.(svg)$/i,
                        loader: 'svg-sprite-loader',
                        exclude: [paths.appSrc],
                    },
                    {
                        test: [/\.svg/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                        include: [paths.appSrc],
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
            // only use one of these nested rules
            { rules: [/* rules */] },
            // use all of these nested rules (combine with conditions to be useful)
            { resource: { and: [/* conditions */] } },
            // matches only if all conditions are matched
            { resource: { or: [/* conditions */] } },
            { resource: [/* conditions */] },
            // matches if any condition is matched (default for arrays)
            { resource: { not: [/* condition */] } }
            // matches if the condition is not matched
        ],
    },
    resolve: {
        modules: ['node_modules', paths.appNodeModules].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        extensions: [".js", ".json", ".jsx", ".css"],
        alias: {
            'react-native': 'react-native-web',
            'components': `${__dirname}/../src/components`,
        },
    },
    performance: {
        hints: "warning", // enum    maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 400000, // int (in bytes)
        assetFilter: function (assetFilename) {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    // source-map most detailed at the expense of build speed.
    context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory
    target: "web", // enum  // the environment in which the bundle should run
    // changes chunk loading behavior and available modules
    externals: [],  // Don't follow/bundle these modules, but request them at runtime from the environment
    serve: { //object
        port: 1337,
        content: './dist',
        // ...
    },
    // lets you provide options for webpack-serve
    stats: "errors-only",  // lets you precisely control what bundle information gets displayed
    devServer: {
        port: 3000,
        host: '127.0.0.1',
        contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: paths.appHtml,
            templateParameters: { PUBLIC_URL: '' }
        }),
        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
        new webpack.DefinePlugin(env.stringified),
        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don't have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don't use Moment.js:
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    }
}
