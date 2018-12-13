import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '@/utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setList,
    setInfo,
} from '../../models/refund';
import { OrderApi } from "../../config/api/order";

function* list({ params }) {
    yield put({
        type: types.order.START_GET_ORDER_REFUND_LIST
    })
    const e = yield call(Fetch.fetch, { api: OrderApi.refund.list, params })
    if (e.code === 0) {
        yield put(setList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* info({ params }) {
    const e = yield call(Fetch.fetch, { api: OrderApi.refund.info, params })
    if (e.code === 0) {
        yield put(setInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* handle({ params }) {
    console.log('handle',params)
    const e = yield call(Fetch.fetch, { api: OrderApi.refund.handle, params })
    if (e.code === 0) {
        yield call(info, { params: { id: params.id } })
    } else {
        message.warning(e.msg)
    }
}

function* receive({ params }) {
    console.log('saga receive',params)
    const e = yield call(Fetch.fetch, { api: OrderApi.refund.receive, params })
    if (e.code === 0) {
        yield call(info, { params: { id: params.id } })
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.order.GET_ORDER_REFUND_LIST, list)
    yield takeEvery(types.order.GET_ORDER_REFUND_INFO, info)
    yield takeEvery(types.order.HANDLE_ORDER_REFUND, handle)
    yield takeEvery(types.order.RECEIVE_ORDER_REFUND, receive)
}
