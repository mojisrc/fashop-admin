import { takeEvery, call, put, select } from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';

import {
    saveOrderEvaluateList,
} from '../../actions/order/evaluate';
import { GoodsApi } from "../../config/api/goods";

function* getOrderEvaluateList({ params }) {
    yield put({
        type: types.order.START_GET_ORDER_EVALUATE_LIST
    })
    const e = yield call(Fetch.fetch, { api: GoodsApi.evaluate.list, params })
    if (e.code === 0) {
        yield put(saveOrderEvaluateList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* replyEvaluate({ params }) {
    const e = yield call(Fetch.fetch, { api: GoodsApi.evaluate.reply, params })
    if (e.code === 0) {
        message.success('回复成功')
        const { orderEvaluateListParams } = yield select(({ view: { order: { orderEvaluateListParams } } }) => ({ orderEvaluateListParams }))
        yield call(getOrderEvaluateList, { params: orderEvaluateListParams })
    } else {
        message.warning(e.msg)
    }
}

function* displayEvaluate({ params }) {
    const e = yield call(Fetch.fetch, { api: GoodsApi.evaluate.display, params })
    if (e.code === 0) {
        yield call(getOrderEvaluateList, { params: { page: 1, rows: 10 } })
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.order.GET_ORDER_EVALUATE_LIST, getOrderEvaluateList)
    yield takeEvery(types.order.REPLY_EVALUATE, replyEvaluate)
    yield takeEvery(types.order.DISPLAY_EVALUATE, displayEvaluate)
}
