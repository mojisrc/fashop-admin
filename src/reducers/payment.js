import types from '../constants';

const initialState = {
    loading: false,
    paymentInfo: {},
    paymentInfoParams: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.order.GET_PAYMENT_INFO:
            return Object.assign({}, state, {
                orderInfoParams: action.orderInfoParams,
            })
        case types.order.SAVE_PAYMENT_INFO:
            return Object.assign({}, state, {
                orderInfo: action.orderInfo,
            })
        default:
            return state;
    }
}
