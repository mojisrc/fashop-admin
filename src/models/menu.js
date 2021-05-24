import memoizeOne from "memoize-one";
import { isEqual } from "@/utils";
import Authorized from "@/utils/authorized";
import Policy from "fashop-policy";

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
    return data
        .map(item => {
            if (!item.name || !item.path) {
                return null;
            }

            let locale = "menu";
            if (parentName) {
                locale = `${parentName}.${item.name}`;
            } else {
                locale = `menu.${item.name}`;
            }

            const result = {
                ...item,
                // name: formatMessage({ id: locale, defaultMessage: item.name }),
                name: item.name,
                locale,
                authority: item.authority || parentAuthority
            };
            if (item.routes) {
                // Reduce memory usage
                result.children = formatter(item.routes, item.authority, locale);
            }
            delete result.routes;
            return result;
        })
        .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children) // eslint-disable-line
        };
    }
    return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
    if (!menuData) {
        return [];
    }
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => check(item.authority, getSubMenu(item)))
        .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
    const routerMap = {};
    const flattenMenuData = data => {
        data.forEach(menuItem => {
            if (menuItem.children) {
                flattenMenuData(menuItem.children);
            }
            // Reduce memory usage
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);
    return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
    namespace: "menu",

    state: {
        menuData: [],
        breadcrumbNameMap: {}
    },

    effects: {
        * getMenuData({ payload, callback }, { put, select }) {
            yield put.resolve({
                type: "member/self"
            });
            const self = yield select(state => state.member.self.result.info);

            const { routes, authority } = payload;
            let menuData = filterMenuData(memoizeOneFormatter(routes, authority));

            // 获得用户权限
            yield put.resolve({
                type: "auth/selfPolicy"
            });
            // 超级管理员不验证
            if (self.id !== 1) {
                const policyList = yield select(state => state.auth.selfPolicy.result.list);
                // 添加验证规则
                let policy = new Policy;
                if (Array.isArray(policyList)) {
                    policyList.map(({ structure }) => {
                        policy.addPolicy(structure);
                    });
                }
                // TODO 路由拦截
                // 过滤没权限的菜单
                menuData.map((item, index) => {
                    // 没权限直接隐藏
                    if (policyList.length === 0) {
                        menuData[index]["hideInMenu"] = true;
                    }
                    if (typeof item["children"] !== "undefined" && item["children"].length !== 0) {
                        let len = 0;
                        item.children.map((sub, i) => {
                            if (typeof sub["policy"] === "undefined" || (typeof sub["policy"] !== "undefined" && policy.viewVerify(sub.policy) !== true) || policyList.length === 0) {
                                len++;
                                menuData[index]["children"][i]["hideInMenu"] = true;
                            }
                        });

                        // 如果子菜单全部隐藏了，那么主菜单也隐藏
                        if (len >= menuData[index]["children"].length) {
                            menuData[index]["hideInMenu"] = true;
                        }
                    } else {
                        // 无子节点权限需要判断
                        if (typeof item["policy"] === "undefined" || (typeof item["policy"] !== "undefined" && policy.viewVerify(item.policy) !== true)) {
                            menuData[index]["hideInMenu"] = true;
                        }
                    }
                });
            }

            const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);

            yield put({
                type: "save",
                payload: { menuData, breadcrumbNameMap }
            });
        }
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
};
