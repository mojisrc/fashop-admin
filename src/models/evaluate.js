export default {
  namespace: "evaluate",

  state: {
    list: []
  },
  effects: {
    * list({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.order.get_order_evaluate_list,
          params,
          orderEvaluateListParams: params
        });
      };
    },
    * saveList(state, action) {
      const { page, rows } = params;
      const { total_number, list } = result;
      return dispatch => {
        dispatch({
          type: types.order.save_order_evaluate_list,
          orderEvaluateList: {
            page,
            rows,
            total_number,
            list
          }
        });
      };
    },
    * reply({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.order.reply_evaluate,
          params
        });
      };
    },
    * display({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.order.display_evaluate,
          params
        });
      };
    },
    * list({ payload }, { call, put }) {
      yield put({
        type: types.order.START_GET_ORDER_EVALUATE_LIST
      });
      const e = yield call(Fetch.fetch, { api: GoodsApi.evaluate.list, params });
      if (e.code === 0) {
        yield put(saveList({ result: e.result, params }));
      } else {
        message.warning(e.msg);
      }
    },
    * reply({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: GoodsApi.evaluate.reply, params });
      if (e.code === 0) {
        message.success("回复成功");
        const { orderEvaluateListParams } = yield select(({ view: { order: { orderEvaluateListParams } } }) => ({ orderEvaluateListParams }));
        yield call(list, { params: orderEvaluateListParams });
      } else {
        message.warning(e.msg);
      }
    },
    * display({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: GoodsApi.evaluate.display, params });
      if (e.code === 0) {
        yield call(list, { params: { page: 1, rows: 10 } });
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
