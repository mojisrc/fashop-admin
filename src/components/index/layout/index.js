//@flow
import React, { Component } from "react";
import { Layout, } from "antd";
import Header from "./header";
import Footer from "./footer";
import SiderMenu from "../../siderMenu"
import logo from '../../../images/logo.png';
import { getMenuData } from '../../../config/menu';
import { enquireScreen } from 'enquire-js';
import PropTypes from 'prop-types';

const { Content } = Layout;

type Props = {
    history: {
        location: {
            pathname: string
        },
        push: Function
    },
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    routerData: {},
    children: Function,
    collapsed: boolean,
    routes: []
};

type State = {
    isMobile: any,
    passwordEditShow: boolean
};

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
    if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
            redirectData.push({
                from: `${item.path}`,
                to: `${item.children[0].path}`,
            });
            item.children.forEach(children => {
                getRedirect(children);
            });
        }
    }
};
getMenuData().forEach(getRedirect);

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
    const result = {};
    const childResult = {};
    for (const i of menuData) {
        if (!routerData[i.path]) {
            result[i.path] = i;
        }
        if (i.children) {
            Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
        }
    }
    return Object.assign({}, routerData, result, childResult);
};

// const query = {
//     'screen-xs': {
//         maxWidth: 575,
//     },
//     'screen-sm': {
//         minWidth: 576,
//         maxWidth: 767,
//     },
//     'screen-md': {
//         minWidth: 768,
//         maxWidth: 991,
//     },
//     'screen-lg': {
//         minWidth: 992,
//         maxWidth: 1199,
//     },
//     'screen-xl': {
//         minWidth: 1200,
//         maxWidth: 1599,
//     },
//     'screen-xxl': {
//         minWidth: 1600,
//     },
// };

let isMobile;
enquireScreen(b => {
    isMobile = b;
});
export default class IndexLayout extends Component<Props, State> {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
    };
    state = {
        passwordEditShow: false,
        isMobile,
    };

    getChildContext() {
        const { location, routerData } = this.props;
        return {
            location,
            breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData),
        };
    }

    render() {
        const { isMobile: mb } = this.state;
        const {
            collapsed,
            location,
            routerData,
            routes
        } = this.props;
        const breadcrumbNameMap = getBreadcrumbNameMap(getMenuData(), routerData);
        return (
            <Layout>
                <SiderMenu
                    logo={logo}
                    // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
                    // If you do not have the Authorized parameter
                    // you will be forced to jump to the 403 interface without permission
                    menuData={getMenuData()}
                    collapsed={collapsed}
                    location={location}
                    isMobile={mb}
                    // onCollapse={this.handleMenuCollapse}
                />
                <Layout>
                    <Header breadcrumbNameMap={breadcrumbNameMap} routes={routes} routerData={routerData}
                            location={location} />
                    <Content>{this.props.children}</Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}
