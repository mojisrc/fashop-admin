export default {
  namespace: "shop",
  state: {
    list: []
  },

  effects: {
    * info() {
      return dispatch => {
        dispatch({
          type: types.shop.get_shop_info
        });
      };
    },

    * setInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.shop.save_shop_info,
          shopInfo: result
        });
      };
    },

    * edit({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shop.edit_shop_info,
          params
        });
      };
    },

    * editGoodsCategoryStyle({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shop.edit_goods_category_style,
          params
        });
      };
    },

    * editShopColorScheme({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shop.edit_shop_color_scheme,
          params
        });
      };
    },

    * editPortalTemplate({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shop.edit_portal_template,
          params
        });
      };
    },

    * info() {
      const e = yield call(Fetch.fetch, { api: ShopApi.info });
      if (e.code === 0) {
        yield put(setInfo({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * edit({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ShopApi.setBaseInfo, params });
      if (e.code === 0) {
        message.success("修改成功！");
        yield call(info);
      } else {
        message.warning(e.msg);
      }
    },

    * editGoodsCategoryStyle({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ShopApi.setGoodsCategoryStyle, params });
      if (e.code === 0) {
        message.success("成功启用！");
        yield call(info);
      } else {
        message.warning(e.msg);
      }
    },

    * editShopColorScheme({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ShopApi.setColorScheme, params });
      if (e.code === 0) {
        message.success("操作成功！");
        yield call(info);
      } else {
        message.warning(e.msg);
      }
    },

    * editPortalTemplate({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ShopApi.setPortalTemplate, params });
      if (e.code === 0) {
        message.success("操作成功！");
        yield call(info);
      } else {
        message.warning(e.msg);
      }
    }
  },
  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    }
  }
};
