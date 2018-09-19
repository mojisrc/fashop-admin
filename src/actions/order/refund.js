import types from '../../constants';

export const getOrderRefundList = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.order.GET_ORDER_REFUND_LIST,
            params
        })
    }
}

export const saveOrderRefundList = ({ result, params }) => {
    const { page, rows } = params
    const { total_number, list } = result
    return dispatch => {
        dispatch({
            type: types.order.SAVE_ORDER_REFUND_LIST,
            orderRefundList: {
                page,
                rows,
                total_number,
                list
            }
        })
    }
}

export const getOrderRefundInfo = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.order.GET_ORDER_REFUND_INFO,
            params,
            orderReundInfoParams: params
        })
    }
}

export const saveOrderRefundInfo = ({ result }) => {
    return dispatch => {
        dispatch({
            type: types.order.SAVE_ORDER_REFUND_INFO,
            orderRefundInfo: result.info
        })
    }
}


export const handleOrderRefund = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.order.HANDLE_ORDER_REFUND,
            params
        })
    }
}

export const receiveOrderRefund = ({ params }) => {
    console.log('action receiveOrderRefund',params)
    return dispatch => {
        dispatch({
            type: types.order.RECEIVE_ORDER_REFUND,
            params
        })
    }
}
