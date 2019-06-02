import React from 'react';
import classNames from 'classnames';
import PageLoading from '@/components/page-loading';
import defaultSettings from '@/config/default-settings';
import BaseMenu, { IBaseMenuProps } from './base-menu';
import { getDefaultCollapsedSubMenus } from './utils';
import './sidebar-menu.less';

export interface ISidebarMenuProps extends IBaseMenuProps {
  prefixCls?: string;
  logo?: string;
  isMobile?: boolean;
}

const { title } = defaultSettings;

const SidebarMenu: React.FC<ISidebarMenuProps> = (props) => {
  const { prefixCls, className, style, collapsed, logo } = props;
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    setOpenKeys(getDefaultCollapsedSubMenus(props))
  }, []);

  const defaultProps = collapsed ? {} : { openKeys };

  const isMainMenu: (key: string) => boolean = key => {
    const { menuData } = props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  const handleOpenChange: (openKeys: string[]) => void = openKeys => {
    const moreThanOne = openKeys.filter(openKey => isMainMenu(openKey)).length > 1;
    setOpenKeys(moreThanOne ? [openKeys.pop()] : [...openKeys])
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`is-collapsed`]: collapsed
      })}
      style={style}
    >
      <div className={`${prefixCls}__logo`}>
        <img src={logo} alt="logo" />
        <h1>{title}</h1>
      </div>
      <React.Suspense fallback={<PageLoading />}>
        <BaseMenu
          {...props}
          mode="inline"
          onOpenChange={handleOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
          {...defaultProps}
        />
      </React.Suspense>
    </div>
  )
};

SidebarMenu.defaultProps = {
  prefixCls: 'lotus-sidebar-menu',
  collapsed: true
};

export default SidebarMenu;
