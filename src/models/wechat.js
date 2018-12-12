export default {
  namespace: "wechat",

  state: {
    list: []
  },

  effects: {

    * configInfo() {
      return dispatch => {
        dispatch({
          type: types.wechat.get_wechat_ifbind
        });
      };
    },

    * apiStatus() {
      return dispatch => {
        dispatch({
          type: types.wechat.get_wechat_api_status
        });
      };
    },

    * editConfig({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_config,
          params
        });
      };
    },

    * setConfigInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_ifbind,
          wechatConfigInfo: result
        });
      };
    },

    * setApiStatus(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_api_status,
          wechatApiStatus: !!result
        });
      };
    },

    * menuList() {
      return dispatch => {
        dispatch({
          type: types.wechat.get_wechat_menu_list
        });
      };
    },

    * setMenuList(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_menu_list,
          wechatMenuList: result
        });
      };
    },

    * setCurrentMenu({ currentMenu }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_current_menu,
          currentMenu
        });
      };
    },

    * createMenuList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.create_wechat_menu_list,
          params
        });
      };
    },


    * configInfo() {
      const e = yield call(Fetch.fetch, { api: WechatApi.getConf });
      if (e.code === 0) {
        yield put(setConfigInfo({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * apiStatus() {
      const e = yield call(Fetch.fetch, { api: WechatApi.checkApiStatus });
      if (e.code === 0) {
        yield put(setApiStatus({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * editConfig({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.confSet, params });
      if (e.code === 0) {
        message.success("操作成功！");
        yield call(configInfo);
      } else {
        message.warning(e.msg);
      }
    },

    * menuList() {
      const e = yield call(Fetch.fetch, { api: WechatApi.menuList });
      if (e.code === 0) {
        yield put(setMenuList({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * createMenuList({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.menuCreate, params });
      if (e.code === 0) {
        message.success("发布成功");
        yield call(menuList);
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
