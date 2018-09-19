const __DEV__ = process.env.NODE_ENV === 'development'
const __DEBUG__ = process.env.DEBUG_BUILD === true
const windowConfig = window.fashop
/*
 *  项目名称
*/
const AppName = `Fashop Admin`

/*
 *  项目平台
*/
const AppPlatform = 'web'

/*
 *  项目存储前缀名称
*/
const AppStorageName = `fashop-admin`

/*
 *  错误收集接口地址
*/
const errorCollectApi = ``

/*
 *  mobile Web域名
*/
const mobileWebDomain = ``

/*
 *  微信AppID(公众平台)
*/
const wxAppId = ``

/*
 *  项目图标
*/
const AppIcon = require('../images/logo.png')

/*
 *  项目版本
*/
const AppVersion = 'web'
/*
 *  项目环境
*/
const AppEnv = __DEV__ ? 'debug' : 'release'
/*
 *  开发环境基础配置
*/
const developmentConfig = {
    // api域名
    domain: windowConfig.apiHost,

    // 是否开启输出日志
    log: true,

    // 是否显示输出日志
    showLog: true,

    // 是否显示接口错误信息
    showNetWorkErrorInfo: true,

    // 是否静默提交接口错误信息
    defaultUploadNetWorkErrorInfo: false,
    dev: __DEV__,

    basename: window.fashop.historyPrefix

}

/*
 *  生产环境基础配置
*/
const productionConfig = {
    // api域名
    domain: windowConfig.apiHost,

    // 是否开启输出日志
    log: false,

    // 是否显示输出日志
    showLog: false,

    // 是否显示接口错误信息
    showNetWorkErrorInfo: false,

    // 是否静默提交接口错误信息
    defaultUploadNetWorkErrorInfo: true,

    dev: __DEV__,

    basename: window.fashop.historyPrefix
}

/*
 *  系统环境配置
*/
const env = (() => {
    if (__DEV__) {                    //开发环境
        return developmentConfig
    } else {                         //生产环境
        return productionConfig
    }
})()

const closeLogger = () => {
    if (!__DEBUG__) {
        // global.console = {
        //     info: () => {},
        //     log: () => {},
        //     warn: () => {},
        //     error: () => {},
        // }
    }
}
const closeShowLogger = () => {
    console.disableYellowBox = true;
}

if (!env.showLog) {
    closeShowLogger()
}

if (!env.log) {
    closeLogger()
}

export {
    AppName,
    AppPlatform,
    AppIcon,
    AppVersion,
    AppEnv,
    AppStorageName,
    errorCollectApi,
    developmentConfig,
    productionConfig,
    env,
    mobileWebDomain,
    wxAppId,
    __DEBUG__,
    __DEV__,
}
