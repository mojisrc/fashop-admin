import types from '../../constants';

export const getOrderEvaluateList = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.order.GET_ORDER_EVALUATE_LIST,
            params,
            orderEvaluateListParams:params
        })
    }
}

export const saveOrderEvaluateList = ({ result, params }) => {
    const { page, rows } = params
    const { total_number, list } = result
    return dispatch => {
        dispatch({
            type: types.order.SAVE_ORDER_EVALUATE_LIST,
            orderEvaluateList: {
                page,
                rows,
                total_number,
                list
            }
        })
    }
}

export const replyEvaluate = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.order.REPLY_EVALUATE,
            params
        })
    }
}

export const displayEvaluate = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.order.DISPLAY_EVALUATE,
            params
        })
    }
}
