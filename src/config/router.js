import React, { createElement } from 'react';
import { View } from "react-web-dom";
import { Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import { getMenuData } from './menu';

let routerDataCache;
const dynamicWrapper = (component) => {
    if (component.toString().indexOf('.then(') < 0) {
        return props => {
            if (!routerDataCache) {
                routerDataCache = getRouterData();
            }
            return createElement(component().default, {
                ...props,
                routerData: routerDataCache,
            });
        };
    }
    return Loadable({
        loader: () => {
            if (!routerDataCache) {
                routerDataCache = getRouterData();
            }
            return component().then(raw => {
                const Component = raw.default || raw;
                return props =>
                    createElement(Component, {
                        ...props,
                        routerData: routerDataCache,
                    });
            });
        },
        loading: () => {
            return <View className="global-content-spin"><Spin size="large" /></View>;
        },
    });
};

function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach(item => {
        if (item.children) {
            keys[item.path] = { ...item };
            keys = { ...keys, ...getFlatMenuData(item.children) };
        } else {
            keys[item.path] = { ...item };
        }
    });
    return keys;
}

export const getRouterData = () => {
    const routerConfig = {
        '/': {
            component: dynamicWrapper(() => import('../pages/setting/deliver')),
        },
        '/home': {
            component: dynamicWrapper(() => import('../pages/setting/deliver')),
        },
        '/home/analysis': {
            component: dynamicWrapper(() => import('../pages/index/index')),
        },
        '/member/self': {
            component: dynamicWrapper(() => import('../pages/member/self')),
        },
        '/wechat/publicAccounts': {
            component: dynamicWrapper(() => import('../pages/wechat/publicAccounts')),
        },
        '/wechat/bindPublicAccounts': {
            component: dynamicWrapper(() => import('../pages/wechat/bindPublicAccounts')),
        },
        '/shop/decorate': {
            component: dynamicWrapper(() => import('../pages/shop/decorate')),
        },
        '/shop/decorate/portal': {
            component: dynamicWrapper(() => import('../pages/shop/decoratePortal')),
        },
        '/shop/decorate/category': {
            component: dynamicWrapper(() => import('../pages/shop/decorateCategory')),
        },
        '/shop/decorate/edit': {
            component: dynamicWrapper(() => import('../pages/shop/pageEdit')),
        },
        '/shop/decorate/add': {
            component: dynamicWrapper(() => import('../pages/shop/pageAdd')),
        },
        '/shop/setting': {
            component: dynamicWrapper(() => import('../pages/shop/setting')),
        },
        '/setting/orderSetting': {
            component: dynamicWrapper(() => import('../pages/setting/orderSetting')),
        },
        '/setting/paymentSetting': {
            component: dynamicWrapper(() => import('../pages/setting/paymentSetting')),
        },
        '/setting/smsSetting': {
            component: dynamicWrapper(() => import('../pages/setting/smsSetting')),
        },
        '/setting/smsEdit': {
            component: dynamicWrapper(() => import('../pages/setting/smsEdit')),
        },
        '/setting/systemSetting': {
            component: dynamicWrapper(() => import('../pages/setting/systemSetting')),
        },
        '/setting/node': {
            component: dynamicWrapper(() => import('../pages/setting/node')),
        },
        '/order/list': {
            component: dynamicWrapper(() => import('../pages/order/list')),
        },
        '/order/list/detail': {
            component: dynamicWrapper(() => import('../pages/order/detail')),
        },
        '/order/list/send': {
            component: dynamicWrapper(() => import('../pages/order/send')),
        },
        '/order/evaluate': {
            component: dynamicWrapper(() => import('../pages/order/evaluate')),
        },
        '/order/refund': {
            component: dynamicWrapper(() => import('../pages/order/refund')),
        },
        '/order/refund/edit': {
            component: dynamicWrapper(() => import('../pages/order/refundEdit')),
        },
        '/goods/category': {
            component: dynamicWrapper(() => import('../pages/goods/category')),
        },
        '/goods/category/add': {
            component: dynamicWrapper(() => import('../pages/goods/categoryAdd')),
        },
        '/goods/category/edit': {
            component: dynamicWrapper(() => import('../pages/goods/categoryEdit')),
        },
        '/goods/list': {
            component: dynamicWrapper(() => import('../pages/goods/list')),
        },
        '/goods/list/add': {
            component: dynamicWrapper(() => import('../pages/goods/add')),
        },
        '/goods/list/edit': {
            component: dynamicWrapper(() => import('../pages/goods/edit')),
        },
        '/user/list': {
            component: dynamicWrapper(() => import('../pages/user/list')),
        },
        '/user/list/detail': {
            component: dynamicWrapper(() => import('../pages/user/detail')),
        },
        '/auth/role': {
            component: dynamicWrapper(() => import('../pages/auth/role')),
        },
        '/auth/member': {
            component: dynamicWrapper(() => import('../pages/auth/member')),
        },
        '/setting/deliver': {
            component: dynamicWrapper(() => import('../pages/setting/deliver')),
        },
        '/setting/deliver/shipper': {
            component: dynamicWrapper(() => import('../pages/setting/shipper')),
        },
        '/setting/deliver/shipperAdd': {
            component: dynamicWrapper(() => import('../pages/setting/shipperAdd')),
        },
        '/setting/deliver/shipperEdit': {
            component: dynamicWrapper(() => import('../pages/setting/shipperEdit')),
        },
        '/setting/deliver/express': {
            component: dynamicWrapper(() => import('../pages/setting/express')),
        },
        '/setting/deliver/expressAdd': {
            component: dynamicWrapper(() => import('../pages/setting/expressAdd')),
        },
        '/setting/deliver/expressEdit': {
            component: dynamicWrapper(() => import('../pages/setting/expressEdit')),
        },
        '/setting/deliver/freight': {
            component: dynamicWrapper(() => import('../pages/setting/freight')),
        },
        '/setting/deliver/freightAdd': {
            component: dynamicWrapper(() => import('../pages/setting/freightAdd')),
        },
        '/setting/deliver/freightEdit': {
            component: dynamicWrapper(() => import('../pages/setting/freightEdit')),
        },
        // '/article/list': {
        //     component: dynamicWrapper(() => import('../pages/article/list')),
        // },
        // '/article/list/add': {
        //     component: dynamicWrapper(() => import('../pages/article/add')),
        // },
        // '/article/list/edit': {
        //     component: dynamicWrapper(() => import('../pages/article/edit')),
        // }
    };
    const menuData = getFlatMenuData(getMenuData());
    const routerData = {};
    Object.keys(routerConfig).forEach(path => {
        const pathRegexp = pathToRegexp(path);
        const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
        let menuItem = {};
        if (menuKey) {
            menuItem = menuData[menuKey];
        }
        let router = routerConfig[path];
        router = {
            ...router,
            name: router.name || menuItem.name,
            authority: router.authority || menuItem.authority,
            hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
        };
        routerData[path] = router;
    });
    return routerData;
};
