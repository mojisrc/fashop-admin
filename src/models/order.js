import Fetch from "../utils/fetch";
import { OrderApi } from "../config/api/order";

export default {
  namespace: "order",

  state: {
    list: []
  },

  effects: {
    * list({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.order.get_order_list,
          params
        });
      };
    },

    * setList(state, action) {
      const { page, rows } = params;
      const { total_number, list } = result;
      return dispatch => {
        dispatch({
          type: types.order.save_order_list,
          orderList: {
            page,
            rows,
            total_number,
            list
          }
        });
      };
    },

    * info({ payload }, { call, put }) {
      return await;
      Fetch.fetch({
        api: OrderApi.info,
        params
      });
      // return dispatch => {
      //     dispatch({
      //         type : types.order.GET_ORDER_INFO,
      //         params,
      //         orderInfoParams:params
      //
      //     })
      // }
    },

    * setInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.order.save_order_info,
          orderInfo: result
        });
      };
    },

    * send({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.order.order_setting,
          params
        });
      };
    },

    * setSend({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.order.order_set_send,
          params
        });
      };
    },
    * list({ payload }, { call, put }) {
      yield put({ type: types.order.START_GET_ORDER_LIST });
      const e = yield call(Fetch.fetch, { api: OrderApi.list, params });
      if (e.code === 0) {
        yield put(setList({ result: e.result, params }));
      } else {
        message.warning(e.msg);
      }
    },

    * info({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: OrderApi.info, params });
      if (e.code === 0) {
        yield put(setInfo({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

// 干嘛的
    * setOrderRe({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: OrderApi.setOrderExpires, params });
      if (e.code === 0) {
        message.success("设置成功");
      } else {
        message.warning(e.msg);
      }
    },

    * setSend({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: OrderApi.setSend, params });
      if (e.code === 0) {
        message.success("设置成功");
        yield put(goBack());
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
}
