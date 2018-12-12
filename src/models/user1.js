import Fetch from "../utils/fetch";
import { UserApi } from "../config/api/user";

export default {
  namespace: "user1",

  state: {
    list: []
  },

  effects: {
    * list({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.user.GET_USER_LIST,
          params,
          userListParams: params
        });
      };
    },

    * setList(state, action) {
      const { page, rows } = params;
      const { total_number, list } = result;
      return dispatch => {
        dispatch({
          type: types.user.SAVE_USER_LIST,
          userList: {
            page,
            rows,
            total_number,
            list
          }
        });
      };
    },

    * info({ payload }, { call, put }) {
      return Fetch.fetch({ api: UserApi.info, params });
    },
    * userStatistics({ params }) {
      return Fetch.fetch({ api: UserApi.statistics, params });
    },


    * setInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.user.SAVE_USER_INFO,
          userInfo: result
        });
      };
    },

    * list({ payload }, { call, put }) {
      yield put({ type: types.user.START_GET_USER_LIST });
      const e = yield call(Fetch.fetch, { api: UserApi.list, params });
      if (e.code === 0) {
        yield put(setList({ result: e.result, params }));
      } else {
        message.warning(e.msg);
      }
    },

    * info({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: UserApi.info, params });
      if (e.code === 0) {
        yield put(setInfo({ result: e.result }));
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
