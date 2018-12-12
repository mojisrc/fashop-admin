export default {
  namespace: "wechatUserTags",

  state: {
    list: []
  },
  effects: {
    * getUserTagList() {
      return dispatch => {
        dispatch({
          type: types.wechat.get_wechat_user_tag_list
        });
      };
    },

    * addUserTagList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.add_wechat_user_tag_list,
          params
        });
      };
    },

    * editUserTagList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.edit_wechat_user_tag_list,
          params
        });
      };
    },

    * delUserTagList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.del_wechat_user_tag_list,
          params
        });
      };
    },

    * tagUser({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.tag_wechat_user,
          params
        });
      };
    },

    * untagUser({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.untag_wechat_user,
          params
        });
      };
    },

    * setUserTagList(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_user_tag_list,
          userTagList: result
        });
      };
    },


    * getUserTagList() {
      const e = yield call(Fetch.fetch, { api: WechatApi.userTagList });
      if (e.code === 0) {
        yield put(setUserTagList({ result: e.result.tags }));
      } else {
        message.warning(e.msg);
      }
    },

    * addUserTagList({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.userTagCreate, params });
      if (e.code === 0) {
        message.success("修改成功");
        yield call(getUserTagList);
      } else {
        message.warning(e.msg);
      }
    },

    * editUserTagList({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.userTagUpdate, params });
      if (e.code === 0) {
        message.success("修改成功");
        yield call(getUserTagList);
      } else {
        message.warning(e.msg);
      }
    },

    * delUserTagList({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.userTagDelete, params });
      if (e.code === 0) {
        message.success("已删除");
        yield call(getUserTagList);
      } else {
        message.warning(e.msg);
      }
    },

    * wechatUserTagTagUsers({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.userTagTagUsers, params });
      if (e.code === 0) {
        message.success("成功加入标签");
        yield call(getUserTagList);
      } else {
        message.warning(e.msg);
      }
    },

    * wechatUserTagUntagUsers({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.userTagUntagUsers, params });
      if (e.code === 0) {
        message.success("成功移除标签");
        yield call(getUserTagList);
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
