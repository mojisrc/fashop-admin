import React from "react";
import { Layout, Spin } from "antd";
import DocumentTitle from "react-document-title";
import isEqual from "lodash/isEqual";
import memoizeOne from "memoize-one";
import { connect } from "umi";
import { ContainerQuery } from "react-container-query";
import classNames from "classnames";
import pathToRegexp from "path-to-regexp";
import Media from "react-media";
import Authorized from "@/utils/authorized";
import logo from "@/assets/images/logo.png";
import Footer from "./footer";
import Context from "./menuContext";
import Exception403 from "../pages/exception/403";
import SiderMenu from "@/components/siderMenu";
import getPageTitle from "@/utils/getPageTitle";
import defaultSettings from "@/defaultSettings";

import styles from "./basicLayout.less";


const { Content } = Layout;

const query = {
    "screen-xs": {
        maxWidth: 575
    },
    "screen-sm": {
        minWidth: 576,
        maxWidth: 767
    },
    "screen-md": {
        minWidth: 768,
        maxWidth: 991
    },
    "screen-lg": {
        minWidth: 992,
        maxWidth: 1199
    },
    "screen-xl": {
        minWidth: 1200,
        maxWidth: 1599
    },
    "screen-xxl": {
        minWidth: 1600
    }
};

class BasicLayout extends React.PureComponent {
    static defaultProps = {
        policyLoading: true
    };

    constructor(props) {
        super(props);
        this.getPageTitle = memoizeOne(this.getPageTitle);
        this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
    }

    componentDidMount() {
        const { dispatch, route: { routes, authority } } = this.props;
        dispatch({
            type: "setting/getSetting"
        });
        dispatch({
            type: "menu/getMenuData",
            payload: { routes, authority }
        });
    }

    getContext() {
        const { location, breadcrumbNameMap } = this.props;
        return {
            location,
            breadcrumbNameMap
        };
    }

    getRouteAuthority = (pathname, routeData) => {
        const routes = routeData.slice(); // clone

        const getAuthority = (routeDatas, path) => {
            let authorities;
            routeDatas.forEach(route => {
                // check partial route
                if (pathToRegexp(`${route.path}(.*)`).test(path)) {
                    if (route.authority) {
                        authorities = route.authority;
                    }
                    // is exact route?
                    if (!pathToRegexp(route.path).test(path) && route.routes) {
                        authorities = getAuthority(route.routes, path);
                    }
                }
            });
            return authorities;
        };

        return getAuthority(routes, pathname);
    };

    getLayoutStyle = () => {
        const { fixSiderbar, isMobile, collapsed, layout } = this.props;
        if (fixSiderbar && layout !== "topmenu" && !isMobile) {
            return {
                // custom: 更改宽度默认为200
                paddingLeft: collapsed ? "80px" : `${defaultSettings.siderMenuWidth}px`
            };
        }
        return null;
    };

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: "global/changeLayoutCollapsed",
            payload: collapsed
        });
    };


    render() {
        const {
            navTheme,
            layout: PropsLayout,
            children,
            location: { pathname },
            isMobile,
            menuData,
            breadcrumbNameMap,
            route: { routes },
            fixedHeader,
            policyLoading
        } = this.props;


        const isTop = PropsLayout === "topmenu";
        const routerConfig = this.getRouteAuthority(pathname, routes);
        const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
        const layout = (
            <Layout>
                {isTop && !isMobile ? null : (
                    <SiderMenu
                        logo={logo}
                        theme={navTheme}
                        onCollapse={this.handleMenuCollapse}
                        menuData={menuData}
                        isMobile={isMobile}
                        {...this.props}
                    />
                )}
                <Layout
                    style={{
                        ...this.getLayoutStyle(),
                        minHeight: "100vh"
                    }}
                >
                    <Content className={styles.content} style={contentStyle}>
                        <Authorized authority={routerConfig} noMatch={<Exception403 />}>
                            {children}
                        </Authorized>
                    </Content>
                    {/*当是装修模块的时候去掉底部*/}
                    {pathname === "/shop/page/add" || pathname === "/shop/page/edit" ? null : <Footer />}
                </Layout>
            </Layout>
        );
        return (
            <React.Fragment>
                <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                    <ContainerQuery query={query}>
                        {params => (
                            <Context.Provider value={this.getContext()}>
                                {policyLoading ?
                                    <Spin size="large" spinning={policyLoading} className={styles.policyLoading}
                                          tip="权限验证中..." /> : <div className={classNames(params)}>{layout}</div>}
                            </Context.Provider>
                        )}
                    </ContainerQuery>
                </DocumentTitle>
            </React.Fragment>
        );
    }
}

export default connect(({ global, setting, menu: menuModel, loading }) => ({
    collapsed: global.collapsed,
    layout: setting.layout,
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
    ...setting,
    policyLoading: loading.effects["auth/selfPolicy"]
}))(props => (
    <Media query="(max-width: 599px)">
        {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
    </Media>
));
