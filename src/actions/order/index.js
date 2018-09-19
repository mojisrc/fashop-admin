import types from '../../constants';
import Fetch from "../../utils/fetch";
import { OrderApi } from "../../config/api/order";

export const getOrderList = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.order.GET_ORDER_LIST,
            params
        })
    }
}

export const saveOrderList = ({ result, params }) => {
    const { page, rows } = params
    const { total_number, list } = result
    return dispatch => {
        dispatch({
            type: types.order.SAVE_ORDER_LIST,
            orderList: {
                page,
                rows,
                total_number,
                list
            }
        })
    }
}

export const getOrderInfo = async ({ params }) => {
    return await Fetch.fetch({
        api: OrderApi.info,
        params
    })
    // return dispatch => {
    //     dispatch({
    //         type : types.order.GET_ORDER_INFO,
    //         params,
    //         orderInfoParams:params
    //
    //     })
    // }
}

export const saveOrderInfo = ({ result }) => {
    return dispatch => {
        dispatch({
            type: types.order.SAVE_ORDER_INFO,
            orderInfo: result
        })
    }
}

export const sendOrderSet = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.order.ORDER_SETTING,
            params
        })
    }
}

export const orderSetSend = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.order.ORDER_SET_SEND,
            params
        })
    }
}
