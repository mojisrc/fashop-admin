// axios 相关配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  withCredentials: false,
  // 使用webpack DefinePlugin 插件
  // 具体配置请参考 /config/server.config.ts
  // @ts-ignore
  baseURL: `${BASE_URL}/admin/`,
};

// 项目相关配置
export const PROJECT_DEFAULT_CONFIG = {
  tokenKey: 'fa_shop_admin_token'
};

// 项目默认设置
export const SETTING_DEFAULT_CONFIG = {
  navTheme: 'dark',
  layout: 'sideMenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSideBar: false
};
