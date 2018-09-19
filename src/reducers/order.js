import types from '../constants';

const initialState = {
    orderListLoading: false,
    orderListParams: {},
    orderList: {},
    orderInfoParams: {},
    orderInfo: {},
    orderEvaluateListLoading: false,
    orderEvaluateListParams: {},
    orderEvaluateList: {},
    orderRefundListLoading: false,
    orderRefundList: {},
    orderRefundInfoParams: {},
    orderRefundInfo: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        // 评价
        case types.order.GET_ORDER_EVALUATE_LIST:
            return Object.assign({}, state, {
                orderEvaluateListParams: action.orderEvaluateListParams,
            })
        // 订单
        case types.order.GET_ORDER_INFO:
            return Object.assign({}, state, {
                orderInfoParams: action.orderInfoParams,
            })
        case types.order.START_GET_ORDER_LIST:
            return Object.assign({}, state, {
                orderListLoading: true,
            })
        case types.order.SAVE_ORDER_LIST:
            return Object.assign({}, state, {
                orderList: action.orderList,
                orderListLoading: false,
            })
        case types.order.SAVE_ORDER_INFO:
            return Object.assign({}, state, {
                orderInfo: action.orderInfo,
            })
        case types.order.START_GET_ORDER_EVALUATE_LIST:
            return Object.assign({}, state, {
                orderEvaluateListLoading: true,
            })
        case types.order.SAVE_ORDER_EVALUATE_LIST:
            return Object.assign({}, state, {
                orderEvaluateList: action.orderEvaluateList,
                orderEvaluateListLoading: false,
            })
        // 退款
        case types.order.START_GET_ORDER_REFUND_LIST:
            return Object.assign({}, state, {
                orderRefundListLoading: true,
            })
        case types.order.SAVE_ORDER_REFUND_LIST:
            return Object.assign({}, state, {
                orderRefundList: action.orderRefundList,
                orderRefundListLoading: false,
            })
        case types.order.GET_ORDER_REFUND_INFO:
            return Object.assign({}, state, {
                orderRefundInfoParams: action.orderRefundInfoParams,
            })
        case types.order.SAVE_ORDER_REFUND_INFO:
            return Object.assign({}, state, {
                orderRefundInfo: action.orderRefundInfo,
            })
        default:
            return state;
    }
}
