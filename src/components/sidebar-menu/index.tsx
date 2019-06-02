import React from 'react';
import { Drawer } from 'antd';
import SidebarMenu, { ISidebarMenuProps } from './sidebar-menu';
import { getFlatMenuKeys } from './utils';

const SidebarMenuWrapper: React.FC<ISidebarMenuProps> = (props) => {
  const { isMobile, collapsed, menuData } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  // 默认折叠
  const [collapsedPlus, setCollapsedPlus] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (isMobile) {
      setCollapsedPlus(collapsed);
    }
  }, [props.isMobile, props.collapsed]);

  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <SidebarMenu
        {...props}
        collapsed={false}
      />
    </Drawer>
  ) : (
    <div
      onMouseEnter={() => {
        setCollapsedPlus(false);
      }}
      onMouseLeave={() => {
        setCollapsedPlus(true);
      }}
    >
      <SidebarMenu
        {...props}
        style={{
          transform: collapsedPlus
            ? 'translate(0, 0)'
            : 'translate(200px, 0)'
        }}
        flatMenuKeys={flatMenuKeys}
        collapsed={collapsedPlus}
      />
    </div>
  );
};

SidebarMenuWrapper.defaultProps = {
  isMobile: false
};

export { ISidebarMenuProps };
export { IMenu } from './base-menu';
export default React.memo(SidebarMenuWrapper);
