import { MenuTheme } from 'antd/es/menu';

export interface IDefaultSettings {
  // 页面主题
  theme: MenuTheme,
  // 菜单相关
  menu: {
    // 是否禁用多语言
    disableLocal: boolean
  };
  // 是否固定Header
  fixedHeader: boolean;
  // 自定义图标链接
  iconFontUrl: string;
  // 项目标题
  title: string;
  // 公司名称
  company: string;
}

const defaultSettings: IDefaultSettings = {
  theme: 'dark',
  menu: {
    disableLocal: false,
  },
  fixedHeader: true,
  title: 'React Admin Template',
  iconFontUrl: '',
  company: '九毛科技',
};

export default defaultSettings;
