import { fetchStatus } from "../utils/index";
export default {
  namespace: "shippingTemplate",

  state: {
    list: []
  },

  effects: {
    * list(callback) {
      return dispatch => {
        dispatch({
          type: types.setting.get_freight_list,
          callback
        });
      };
    },


    * setList({ list }) {
      return dispatch => {
        dispatch({
          type: types.setting.set_freight_list,
          list
        });
        return new Promise((resolve, reject) => {
          resolve();
        });
      };
    },
    * getList({ callback }) {
      const e = yield call(Fetch.fetch, { api: FreightApi.list });
      if (e.code === 0) {
        const {
          list
        } = e.result;
        yield put(setList({ list }));
        yield callback && callback();
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
