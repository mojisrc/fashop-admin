'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const paths = require('./paths');
const getClientEnvironment = require('./env');
const { getPagesFileEntry } = require('./fileReady');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const publicPath = paths.servedPath;


var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });


const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

// Note: defined here because it will be used more than once.
// const cssFilename = 'static/css/[name].[md5:contenthash:hex:20:8].css';
const cssFilename = 'static/css/[name].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
    : {};

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
const entryFile = Object.assign({}, {
    main: [require.resolve('./polyfills'), paths.appIndexJs]
}, getPagesFileEntry(paths.appPage))

// console.log(entryFile)
module.exports = {
    mode: "production",
    // Don't attempt to continue if there are any errors.
    bail: true,
    // We generate sourcemaps in production. This is slow but gives good results.
    // You can exclude the *.map files from the build during deployment.
    devtool: shouldUseSourceMap ? 'source-map' : false,
    // In production, we only want to load the polyfills and the app code.
    entry: path.join(__dirname, '../src/index'),
// {
//         // bundle: path.join(__dirname, '../src/index')
//         // vendor: ['react','react-dom','react-router','moment','qs','echarts','antd']
//     },
    // externals: {
    //     'react':'react',
    //     'react-dom':'react-dom',
    //     'react-router':'react-router',
    //     'moment':'moment',
    //     'qs':'qs',
    //     'echarts':'echarts',
    //     "antd":"antd"
    // },
    output: {
        // The build folder.
        path: paths.appBuild,
        // Generated JS file names (with nested folders).
        // There will be one main bundle, and one file per asynchronous chunk.
        // We don't currently advertise code splitting but Webpack supports it.
        filename: 'static/js/[name].js',
        // filename: 'static/js/[name].[chunkhash:8].js',
        // chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        chunkFilename: 'static/js/[name].js',
        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: publicPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path
                .relative(paths.appSrc, info.absoluteResourcePath)
                .replace(/\\/g, '/'),
    },
    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to "win"
        // if there are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: ['node_modules', paths.appNodeModules].concat(
            // It is guaranteed to exist because we tweak it in `env.js`
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        // These are the reasonable defaults supported by the Node ecosystem.
        // We also include JSX as a common component filename extension to support
        // some tools, although we do not recommend using it, see:
        // https://github.com/facebookincubator/create-react-app/issues/290
        // `web` extension prefixes have been added for better support
        // for React Native Web.
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
        alias: {

            // Support React Native Web
            // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
            'react-native': 'react-native-web',
            'components': `${__dirname}/../src/components`,
        },
        plugins: [
            // Prevents users from importing files from outside of src/ (or node_modules/).
            // This often causes confusion because we only process files within src/ with babel.
            // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
            // please link the files into your node_modules/ and let module-resolution kick in.
            // Make sure your source files are compiled, as they will not be processed in any way.
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        ],
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                // use: [
                //     {
                //         options: {
                //             formatter: eslintFormatter,
                //             eslintPath: require.resolve('eslint'),
                //
                //         },
                //     },
                // ],
                loader: 'happypack/loader?id=eslint-loader',
                include: paths.appSrc,
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[folder]-[name].[ext]',
                            // name: 'static/media/[path][name].[ext]',
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
                                'transform-decorators-legacy'
                            ],
                            compact: true,
                        },
                    },
                    {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract(
                            Object.assign(
                                {
                                    fallback: require.resolve('style-loader'),
                                    use: [
                                        {
                                            loader: require.resolve('css-loader'),
                                            options: {
                                                importLoaders: 1,
                                                minimize: true,
                                                sourceMap: shouldUseSourceMap,
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
                                },
                                extractTextPluginOptions
                            )
                        ),
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
                                    modifyVars: require('../package.json').theme,
                                },
                            },
                        ],
                        exclude: [paths.appComponentCssModules]
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
                            name: 'static/media/[folder]-[name].[ext]',
                        },
                        include: [paths.appSrc],
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'static/media/[folder]-[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HappyPack({
            id: 'eslint-loader',
            threads: 10,
            loaders: [require.resolve('eslint-loader')]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
        // It is absolutely essential that NODE_ENV was set to production here.
        // Otherwise React will be compiled in the very slow development mode.
        new webpack.DefinePlugin(env.stringified),
        // Minify the code.
        // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
        new ExtractTextPlugin({
            filename: cssFilename,
        }),
        // Generate a manifest file which contains a mapping of all asset filenames
        // to their corresponding output file so that tools can pick it up without
        // having to parse `index.html`.
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),
        // Generate a service worker script that will precache, and keep up to date,
        // the HTML & assets that are part of the Webpack build.
        new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    // This message occurs for every build and is a bit too noisy.
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {
                    // This message obscures real errors so we ignore it.
                    // https://github.com/facebookincubator/create-react-app/issues/2612
                    return;
                }
                console.log(message);
            },
            minify: true,
            // For unknown URLs, fallback to the index page
            navigateFallback: publicUrl + '/index.html',
            // Ignores URLs starting from /__ (useful for Firebase):
            // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            // Don't precache sourcemaps (they're large) and build asset manifest:
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don't use Moment.js:
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /react|react-dom|react-router|moment|qs|echarts|antd|angluar|lodash/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};
