export default {
  namespace: "wechatUser",

  state: {
    list: []
  },

  effects: {

    * getUserList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_wechat_user_list,
          params
        });
      };
    },

    * setUserList({ result, allUserListTotal, first }) {
      let pageArr = [];
      result.data.openid.map((openidItem, index)
      {
        if (index % 20 === 0) {
          pageArr.push(openidItem);
        }
      }
    )
      return dispatch => {
        dispatch({
          type: types.wechat.set_user_list,
          userList: result,
          allUserListTotal
        });
        if (first) {
          dispatch({
            type: types.wechat.set_wechat_user_list_page_arr,
            pageArr
          });
        }
      };
    },

    * getUserListByTag({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_wechat_user_list_by_tag,
          params
        });
      };
    },

    * setUserListByTag({ result }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_user_list_by_tag,
          userList: result
        });
      };
    },

    * getUserBlackList() {
      return dispatch => {
        dispatch({
          type: types.wechat.get_wechat_user_black_list
        });
      };
    },

    * setUserBlock({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_user_black,
          params
        });
      };
    },

    * setUserUnblock({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_user_unblack,
          params
        });
      };
    },

    * editUserRemark({ params, editType }) {
      return dispatch => {
        dispatch({
          type: types.wechat.edit_wechat_user_remark,
          params,
          editType
        });
      };
    },

    * setUserBlackList(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_user_black_list,
          userBlackList: result
        });
      };
    },
    * setUserInfoList(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_user_info_list,
          userInfoList: result
        });
      };
    },

    * setUserInfoBlackList(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_user_info_black_list,
          userInfoBlackList: result
        });
      };
    },
    * getUserList({ payload }, { call, put }) {
      yield put({
        type: types.wechat.START_GET_USER_LIST
      });
      const e = yield call(Fetch.fetch, { api: WechatApi.userList, params });
      if (e.code === 0) {
        yield put(setUserList({
          result: e.result,
          allUserListTotal: e.result.total,
          first: !params.next_openid
        }));
        yield call(getUserInfoList, { params: { openids: e.result.data.openid.slice(0, 20) } });
      } else {
        message.warning(e.msg);
      }
    },

    * getUserBlackList() {
      yield put({
        type: types.wechat.START_GET_USER_BLACK_LIST
      });
      const e = yield call(Fetch.fetch, { api: WechatApi.userBlackList });
      if (e.code === 0) {
        yield put(setUserBlackList({ result: e.result }));
        if (e.result.total) {
          yield call(getUserInfoList, { params: { openids: e.result.data.openid }, type: "black" });
        }
      } else {
        message.warning(e.msg);
      }
    },

    * getUserInfoList({ params, type }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.userSelect, params });
      if (e.code === 0) {
        if (type === "black") {
          yield put(setUserInfoBlackList({ result: e.result.user_info_list }));
        } else {
          yield put(setUserInfoList({ result: e.result.user_info_list }));
        }
      } else {
        message.warning(e.msg);
      }
    },

    * setUserBlock({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.userBlock, params });
      if (e.code === 0) {
        message.success("成功加入黑名单");
        yield call(getUserList, { params: {} });
        yield call(getUserBlackList);
      } else {
        message.warning(e.msg);
      }
    },

    * setUserUnblock({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.userUnblock, params });
      if (e.code === 0) {
        message.success("成功移出黑名单");
        yield call(getUserList, { params: {} });
        yield call(getUserBlackList);
      } else {
        message.warning(e.msg);
      }
    },

    * editUserRemark({ params, editType }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.userRemark, params });
      if (e.code === 0) {
        message.success("修改成功");
        if (editType === "black") {
          yield call(getUserBlackList);
        } else {
          yield call(getUserList, { params: {} });
        }
      } else {
        message.warning(e.msg);
      }
    },

    * getUserListByTag({ payload }, { call, put }) {
      yield put({
        type: types.wechat.START_GET_USER_LIST_BY_TAG
      });
      const e = yield call(Fetch.fetch, { api: WechatApi.userTagUsersOfTag, params });
      if (e.code === 0) {
        let openids = e.result.data && e.result.data.openid.slice(0, 20);
        if (openids) {
          yield put(setUserListByTag({
            result: e.result
          }));
          yield call(getUserInfoList, { params: { openids } });
        } else {
          yield put(setUserListByTag({
            result: {}
          }));
          yield put(setUserInfoList({ result: [] }));
        }
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
