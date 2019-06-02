import { Icon } from 'antd';
import defaultSettings from '@/config/default-settings';

// 使用：
// import IconFont from '@/components/icon-font';
// <IconFont type='icon-demo' className='xxx-xxx' />
export default Icon.createFromIconfontCN({
  scriptUrl: defaultSettings.iconFontUrl || ''
});
