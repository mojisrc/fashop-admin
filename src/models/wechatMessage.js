export default {
  namespace: "wechatMessage",

  state: {
    list: []
  },

  effects: {
    * getBroadcastRecord({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_broadcast_record,
          params
        });
      };
    },

    * setBroadcastRecord({ result }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_broadcast_record,
          broadcastRecord: result
        });
      };
    },

    * createWechatBroadcast({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.create_wechat_broadcast,
          params
        });
      };
    },
    * delBroadcastRecord({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.del_wechat_broadcast,
          params
        });
      };
    },

    * getBroadcastUserSearch({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_broadcast_user_search,
          params
        });
      };
    },

    * setBroadcastUserSearch({ result }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_broadcast_user_search,
          broadcastRecordUserSearch: result
        });
      };
    },

    * getBroadcastSurplus({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_broadcast_surplus,
          params
        });
      };
    },

    * setBroadcastSurplus({ result }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_broadcast_surplus,
          broadcastRecordSurplus: result
        });
      };
    },

    * getBroadcastRecord({ payload }, { call, put }) {
      yield put({
        type: types.wechat.START_GET_BROADCAST_RECORD
      });
      const e = yield call(Fetch.fetch, { api: WechatApi.broadcastRecords, params });
      if (e.code === 0) {
        yield put(setBroadcastRecord({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * createWechatBroadcast({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.broadcastCreate, params });
      if (e.code === 0) {
        yield call(getBroadcastRecord, { params: {} });
      } else {
        message.warning(e.msg);
      }
    },

    * delBroadcastRecord({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.broadcastRecordsDel, params });
      if (e.code === 0) {
        message.success("已删除");
        yield call(getBroadcastRecord, { params: {} });
      } else {
        message.warning(e.msg);
      }
    },

    * getBroadcastUserSearch({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.broadcastUserSearch, params });
      if (e.code === 0) {
        yield put(setBroadcastUserSearch({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * getBroadcastSurplus({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.broadcastSurplus, params });
      if (e.code === 0) {
        yield put(setBroadcastSurplus({ result: e.result }));
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
