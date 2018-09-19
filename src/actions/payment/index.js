import types from "../../constants";

export const getPaymentInfo = () => {
    return dispatch => {
        dispatch({
            type: types.payment.GET_PAYMENT_INFO,
        })
    }
}
