import React from 'react';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/components/authorized';
import Policy from '@jiumao/policy';
import PageLoading from '@/components/page-loading';
import Exception403 from '@/pages/exception/403';
import { ConnectProps, ConnectState } from '@/models/connect';

interface IProps extends ConnectProps {
  policy: Policy;
  routerData: any[];
  loading: boolean;
}

const AuthComponent: React.FC<IProps> = (props) => {
  const {
    policy,
    loading,
    location,
    children,
    routerData,
    dispatch
  } = props;

  React.useState(() => {
    // 类似 Promise.all 实现比较合理，待优化
    // 获取所有操作
    dispatch({
      type: 'user/fetchActions'
    })
    .then(() => {
      // 获取当前登录用户信息 -- 包含权限策略
      dispatch({
        type: 'user/fetchCurrent'
      });
    })
  });

  const getRouteAuthority = (path, routeData) => {
    let authorities = undefined;
    routeData.forEach(route => {
      // match prefix
      if (pathToRegexp(`${route.path}(.*)`).test(path)) {
        authorities = route.authority || authorities;

        // get children authority recursively
        if (route.routes) {
          authorities = getRouteAuthority(path, route.routes) || authorities;
        }
      }
    });
    return authorities;
  };

  if (loading || !policy) {
    return (
      <PageLoading />
    )
  }

  const authority = getRouteAuthority(location.pathname, routerData);

  return (
    <Authorized
      authority={authority}
      noMatch={<Exception403 />}
    >
      {children}
    </Authorized>
  )
};

AuthComponent.defaultProps = {
  policy: null
};

export default connect(({ menu, user, loading }: ConnectState) => ({
  policy: user.policy,
  routerData: menu.routerData,
  loading: loading['user/fetchCurrent'],
}))(AuthComponent);

