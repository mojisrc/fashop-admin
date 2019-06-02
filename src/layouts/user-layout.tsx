import React, { useState } from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '@/components/global-footer';
import SelectLang from '@/components/select-lang';
import { IMenu } from '@/components/side-menu';
import { moGetPageTitle, moGetTitle } from '@/utils/getPageTitle';
import { ConnectProps } from '@/models/connect';
import logo from '@/assets/logo.svg';
import Copyright from './copyright';
import './user-layout.less';

export interface IProps
  extends Required<ConnectProps> {
    prefixCls?: string;
    breadcrumbNameMap: { [path: string]: IMenu };
  }

const UserLayout: React.FC<IProps> = (props) => {
  const {
    prefixCls,
    location,
    dispatch,
    breadcrumbNameMap,
    route: { routes, authority },
    children
  } = props;

  useState(() => {
    dispatch({
      type: 'menu/getMenuData',
      payload: {
        routes,
        authority
      }
    });
  });

  const title = moGetTitle(location!.pathname, breadcrumbNameMap);

  return (
    <DocumentTitle title={moGetPageTitle(location!.pathname, breadcrumbNameMap)}>
      <div className={prefixCls}>
        <div className="layout-container">
          <div className={`${prefixCls}__wrapper`}>
            <div className={`${prefixCls}__container`}>
              <div className={`${prefixCls}__lang`}>
                <SelectLang />
              </div>
              <div className={`${prefixCls}__header`}>
                <img src={logo} alt="logo"/>
                <h2>React Admin Template</h2>
              </div>
              <div className={`${prefixCls}__title`}>
                <h2>{title}</h2>
              </div>
              <div className={`${prefixCls}__children`}>
                {children}
              </div>
            </div>
          </div>
        </div>
        <GlobalFooter copyright={<Copyright />} />
      </div>
    </DocumentTitle>
  );
};

UserLayout.defaultProps = {
  prefixCls: 'lotus-user-layout'
};

export default connect(({ menu }) => ({
  breadcrumbNameMap: menu.breadcrumbNameMap
}))(UserLayout);
