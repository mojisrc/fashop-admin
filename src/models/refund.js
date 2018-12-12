export default {
  namespace: "refund",

  state: {
    list: []
  },

  effects: {

    * list({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.order.get_order_refund_list,
          params
        })
      }
    },

    * setList(state, action) {
      const { page, rows } = params
      const { total_number, list } = result
      return dispatch => {
        dispatch({
          type: types.order.save_order_refund_list,
          orderRefundList: {
            page,
            rows,
            total_number,
            list
          }
        })
      }
    },

    * info({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.order.get_order_refund_info,
          params,
          orderReundInfoParams: params
        })
      }
    },

    * setInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.order.save_order_refund_info,
          orderRefundInfo: result.info
        })
      }
    },


    * handle({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.order.handle_order_refund,
          params
        })
      }
    },

    * receive({ payload }, { call, put }) {
      console.log('action receive', params)
      return dispatch => {
        dispatch({
          type: types.order.receive_order_refund,
          params
        })
      }
    },
    * list({ payload }, { call, put }) {
      yield put({
        type: types.order.START_GET_ORDER_REFUND_LIST
      })
      const e = yield call(Fetch.fetch, { api: OrderApi.refund.list, params })
      if (e.code === 0) {
        yield put(setList({ result: e.result, params }))
      } else {
        message.warning(e.msg)
      }
    },

    * info({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: OrderApi.refund.info, params })
      if (e.code === 0) {
        yield put(setInfo({ result: e.result }))
      } else {
        message.warning(e.msg)
      }
    },

    * handle({ payload }, { call, put }) {
      console.log('handle', params)
      const e = yield call(Fetch.fetch, { api: OrderApi.refund.handle, params })
      if (e.code === 0) {
        yield call(info, { params: { id: params.id } })
      } else {
        message.warning(e.msg)
      }
    },

    * receive({ payload }, { call, put }) {
      console.log('saga receive', params)
      const e = yield call(Fetch.fetch, { api: OrderApi.refund.receive, params })
      if (e.code === 0) {
        yield call(info, { params: { id: params.id } })
      } else {
        message.warning(e.msg)
      }
    },

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
