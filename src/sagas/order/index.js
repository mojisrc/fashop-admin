import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import { saveOrderList, saveOrderInfo } from '../../actions/order';
import { goBack } from 'react-router-redux'
import { OrderApi } from "../../config/api/order";

function* getOrderList({ params }) {
    yield put({ type: types.order.START_GET_ORDER_LIST })
    const e = yield call(Fetch.fetch, { api: OrderApi.list, params })
    if (e.code === 0) {
        yield put(saveOrderList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* getOrderInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: OrderApi.info, params })
    if (e.code === 0) {
        yield put(saveOrderInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

// 干嘛的
function* setOrderRe({ params }) {
    const e = yield call(Fetch.fetch, { api: OrderApi.setOrderExpires, params })
    if (e.code === 0) {
        message.success('设置成功')
    } else {
        message.warning(e.msg)
    }
}

function* setSend({ params }) {
    const e = yield call(Fetch.fetch, { api: OrderApi.setSend, params })
    if (e.code === 0) {
        message.success('设置成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.order.GET_ORDER_LIST, getOrderList)
    yield takeEvery(types.order.GET_ORDER_INFO, getOrderInfo)
    yield takeEvery(types.order.ORDER_SETTING, setOrderRe)
    yield takeEvery(types.order.ORDER_SET_SEND, setSend)
}
