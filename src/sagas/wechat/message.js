import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setBroadcastRecord,
    setBroadcastUserSearch,
    setBroadcastSurplus,
} from '../../actions/wechat/message';
import { WechatApi } from "../../config/api/wechat";

function* getBroadcastRecord({ params }) {
    yield put({
        type: types.wechat.START_GET_BROADCAST_RECORD
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.broadcastRecords, params })
    if (e.code === 0) {
        yield put(setBroadcastRecord({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* createWechatBroadcast({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.broadcastCreate, params })
    if (e.code === 0) {
        yield call(getBroadcastRecord, { params: {} })
    } else {
        message.warning(e.msg)
    }
}

function* delBroadcastRecord({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.broadcastRecordsDel, params })
    if (e.code === 0) {
        message.success('已删除')
        yield call(getBroadcastRecord, { params: {} })
    } else {
        message.warning(e.msg)
    }
}

function* getBroadcastUserSearch({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.broadcastUserSearch, params })
    if (e.code === 0) {
        yield put(setBroadcastUserSearch({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* getBroadcastSurplus({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.broadcastSurplus, params })
    if (e.code === 0) {
        yield put(setBroadcastSurplus({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.wechat.GET_BROADCAST_RECORD, getBroadcastRecord)
    yield takeEvery(types.wechat.DEL_WECHAT_BROADCAST, delBroadcastRecord)
    yield takeEvery(types.wechat.CREATE_WECHAT_BROADCAST, createWechatBroadcast)
    yield takeEvery(types.wechat.GET_BROADCAST_USER_SEARCH, getBroadcastUserSearch)
    yield takeEvery(types.wechat.GET_BROADCAST_SURPLUS, getBroadcastSurplus)
}
