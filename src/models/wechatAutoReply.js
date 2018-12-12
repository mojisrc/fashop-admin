export default {
  namespace: "wechatAutoReply",

  state: {
    list: []
  },

  effects: {
    * autoReplyStatus() {
      return dispatch => {
        dispatch({
          type: types.wechat.get_auto_reply_status
        });
      };
    },

    * saveAutoReplyStatus(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.save_auto_reply_status,
          autoReplyStatus: result.status
        });
      };
    },

    * setAutoReplyStatus({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_auto_reply_status,
          params
        });
      };
    },

    * keyWordsReplyList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_keywords_reply_list,
          params
        });
      };
    },

    * delAutoReplyKeywords({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.del_auto_reply_keywords,
          params
        });
      };
    },

    * addAutoReplyKeywords({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.add_auto_reply_keywords,
          params
        });
      };
    },

    * editAutoReplyKeywords({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.edit_auto_reply_keywords,
          params
        });
      };
    },

    * saveKeyWordsReplyList(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.save_keywords_reply_list,
          keyWordsReplyList: result
        });
      };
    },
    * getAutoReplyKeywordsInfo({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_auto_reply_keywords_detail,
          params
        });
      };
    },

    * setAutoReplyKeywordsInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_auto_reply_keywords_detail,
          autoReplyKeywordsInfo: result
        });
      };
    },

    * getFollowedReplyInfo() {
      return dispatch => {
        dispatch({
          type: types.wechat.get_followed_reply_info
        });
      };
    },

    * saveFollowedReplyInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.wechat.save_followed_reply_info,
          followedReplyInfo: result
        });
      };
    },

    * setFollowedReplyInfo({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_followed_reply_info,
          params
        });
      };
    },

    * autoReplyStatus() {
      const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyStatusSet });
      if (e.code === 0) {
        yield put(saveAutoReplyStatus({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * setAutoReplyStatus({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyStatusSet, params });
      if (e.code === 0) {
        yield call(autoReplyStatus);
      } else {
        message.warning(e.msg);
      }
    },

    * keyWordsReplyList({ payload }, { call, put }) {
      yield put({
        type: types.wechat.START_GET_KEYWORDS_REPLY_LIST
      });
      const e = yield call(Fetch.fetch, { api: WechatApi.replyKeywordsList, params });
      if (e.code === 0) {
        yield put(saveKeyWordsReplyList({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * delAutoReplyKeywords({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyKeywordsDel, params });
      if (e.code === 0) {
        message.success("已删除");
        yield call(keyWordsReplyList, { params: {} });
      } else {
        message.warning(e.msg);
      }
    },

    * addAutoReplyKeywords({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyKeywordsAdd, params });
      if (e.code === 0) {
        message.success("添加成功");
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },

    * editAutoReplyKeywords({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyKeywordsEdit, params });
      if (e.code === 0) {
        message.success("修改成功");
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },

    * getAutoReplyKeywordsInfo({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyKeywordsInfo, params });
      if (e.code === 0) {
        yield put(setAutoReplyKeywordsInfo({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * getFollowedReplyInfo() {
      const e = yield call(Fetch.fetch, { api: WechatApi.autoReplySubscribeGet });
      if (e.code === 0) {
        yield put(saveFollowedReplyInfo({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * setFollowedReplyInfo({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.autoReplySubscribeSet, params });
      if (e.code === 0) {
        message.success("保存成功");
        yield call(getFollowedReplyInfo);
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
