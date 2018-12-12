export default {
  namespace: "payment",

  state: {
    list: []
  },

  effects: {
    * info() {
      return dispatch => {
        dispatch({
          type: types.payment.get_payment_info
        });
      };
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
