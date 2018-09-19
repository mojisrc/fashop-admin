import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    saveOrderRefundList,
    saveOrderRefundInfo,
} from '../../actions/order/refund';
import { OrderApi } from "../../config/api/order";

function* getOrderRefundList({ params }) {
    yield put({
        type: types.order.START_GET_ORDER_REFUND_LIST
    })
    const e = yield call(Fetch.fetch, { api: OrderApi.refund.list, params })
    if (e.code === 0) {
        yield put(saveOrderRefundList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* getOrderRefundInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: OrderApi.refund.info, params })
    if (e.code === 0) {
        yield put(saveOrderRefundInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* handleOrderRefund({ params }) {
    console.log('handleOrderRefund',params)
    const e = yield call(Fetch.fetch, { api: OrderApi.refund.handle, params })
    if (e.code === 0) {
        yield call(getOrderRefundInfo, { params: { id: params.id } })
    } else {
        message.warning(e.msg)
    }
}

function* receiveOrderRefund({ params }) {
    console.log('saga receiveOrderRefund',params)
    const e = yield call(Fetch.fetch, { api: OrderApi.refund.receive, params })
    if (e.code === 0) {
        yield call(getOrderRefundInfo, { params: { id: params.id } })
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.order.GET_ORDER_REFUND_LIST, getOrderRefundList)
    yield takeEvery(types.order.GET_ORDER_REFUND_INFO, getOrderRefundInfo)
    yield takeEvery(types.order.HANDLE_ORDER_REFUND, handleOrderRefund)
    yield takeEvery(types.order.RECEIVE_ORDER_REFUND, receiveOrderRefund)
}
