import { Reducer } from 'redux';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import Policy from '@jiumao/policy';
import { formatMessage } from 'umi-plugin-react/locale';
import { Effect } from '@/models/connect';
import checkAuthority from '@/components/authorized/check-authority';
import { IMenu } from '@/components/sidebar-menu';
import defaultSettings from '@/config/default-settings';

const { menu } = defaultSettings;
let policy: Policy = null;

function formatterMenu(
  data: IRoute[],
  parentName?: string,
): IMenu[] {
  let newMenus: IMenu[] = [];

  const menus = data.filter(item => item.name && item.path);

  menus.forEach(item => {
    const locale = `${parentName || 'menu'}.${item.name!}`;

    const name = menu.disableLocal
      ? item.name!
      : formatMessage({ id: locale, defaultMessage: item.name! });

    const result: IMenu = {
      ...item,
      name,
      locale,
      routes: void 0,
      authority: item.authority || undefined,
    };

    if (item.routes) {
      // Reduce memory usage
      result.children = formatterMenu(item.routes, locale);

      if (!result.children.length) {
        return;
      }
    }

    // 检查权限
    let authResult = checkAuthority(policy, result.authority);

    if (authResult) {
      newMenus.push(result);
    }
  });

  return newMenus;
}

// 获取面包屑映射
const getBreadcrumbNameMap = (menuData: IMenu[]) => {
  const routerMap: { [key: string]: IMenu } = {};
  const flattenMenuData: (data: IMenu[]) => void = data => {
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

const memoizeOneFormatter = memoizeOne(formatterMenu, isEqual);
const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

// 过滤菜单数据
const filterMenuData = (menuData: IMenu[] = []): IMenu[] => {
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .filter(item => item);
};

export interface IRoute extends IMenu {
  routes?: IMenu[];
  component?: string;
  Routes?: string[];
  redirect?: string;
}

export interface IMenuModelState {
  menuData: IMenu[];
  routerData: IRoute[];
  breadcrumbNameMap: object;
}

export interface IMenuModel {
  namespace: 'menu',
  state: IMenuModelState,
  effects: {
    getMenuData: Effect;
  },
  reducers: {
    saveState: Reducer<any>;
  };
}

const MenuModel: IMenuModel = {
  namespace: 'menu',
  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {}
  },
  effects: {
    *getMenuData({ payload, callback }, { put }) {
      const { routes } = payload;
      policy = payload.policy;
      const originalMenuData = memoizeOneFormatter(routes);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);

      yield put({
        type: 'saveState',
        payload: {
          menuData,
          breadcrumbNameMap,
          routerData: routes
        }
      });

      callback && callback();
    }
  },
  reducers: {
    saveState(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};

export default MenuModel;
