import React, { useState } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import Policy from '@jiumao/policy';
import useMedia from 'react-media-hook2';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import SidebarMenu, { ISidebarMenuProps, IMenu } from '@/components/sidebar-menu';
import { moGetPageTitle } from '@/utils/getPageTitle';
import { ConnectProps, ConnectState, ISettingModelState } from '@/models/connect';
import logo from '@/assets/logo.svg';
import Context from './menu-context';
import Header from './header';
import './basic-layout.less';

interface IProps
  extends Required<ConnectProps>, ISidebarMenuProps {
    prefixCls?: string;
    policy: Policy;
    tabActiveKey?: string;
    breadcrumbNameMap?: { [path: string]: IMenu };
    setting?: ISettingModelState;
}

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};
const { Content } = Layout;

const BasicLayout: React.FC<IProps> = (props) => {
  const {
    dispatch,
    location,
    route,
    policy,
    menuData,
    breadcrumbNameMap,
    setting,
    children
  } = props;
  const { fixedHeader, theme } = setting;
  const { prefixCls, ...restProps } = props;
  const { routes } = route!;

  // constructor
  useState(() => {
    // 获取菜单数据
    dispatch!({
      type: 'menu/getMenuData',
      payload: {
        routes,
        policy
      },
    });
  });

  const isMobile = useMedia({ id: 'BasicLayout', query: '(max-width: 599px)' })[0];

  const layout = (
    <Layout className={prefixCls}>
      {/** 左侧菜单 */}
      <SidebarMenu
        logo={logo}
        theme={theme}
        menuData={menuData}
        isMobile={isMobile}
        {...restProps}
      />
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Header
          isMobile={isMobile}
          {...restProps}
        />
        <Content
          className={`${prefixCls}__wrapper`}
          style={!fixedHeader ? { paddingTop: 0 } : {}}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );

  return (
    <DocumentTitle title={moGetPageTitle(location!.pathname, breadcrumbNameMap)}>
      <ContainerQuery query={query}>
        {params => (
          <Context.Provider value={{ location, breadcrumbNameMap }}>
            <div className={classNames(params)}>
              {layout}
            </div>
          </Context.Provider>
        )}
      </ContainerQuery>
    </DocumentTitle>
  )
};

BasicLayout.defaultProps = {
  prefixCls: 'lotus-basic-layout'
};

export default connect(({ menu, setting, user }: ConnectState) => ({
  policy: user.policy,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
  setting
}))(BasicLayout);
