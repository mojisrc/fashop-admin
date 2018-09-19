import {takeEvery, call, put} from 'redux-saga/effects'
import { Fetch} from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setWechatConfigInfo,
    setWechatApiStatus,
    setWechatMenuList,
} from '../../actions/wechat';
import { WechatApi } from "../../config/api/wechat";

function* getWechatConfigInfo() {
    const e = yield call(Fetch.fetch, { api: WechatApi.getConf })
    if (e.code === 0) {
        yield put(setWechatConfigInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* getWechatApiStatus() {
    const e = yield call(Fetch.fetch, { api: WechatApi.checkApiStatus })
    if (e.code === 0) {
        yield put(setWechatApiStatus({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* editWechatConfig({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.confSet, params })
    if (e.code === 0) {
        message.success('操作成功！')
        yield call(getWechatConfigInfo)
    } else {
        message.warning(e.msg)
    }
}

function* getWechatMenuList() {
    const e = yield call(Fetch.fetch, { api: WechatApi.menuList })
    if (e.code === 0) {
        yield put(setWechatMenuList({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* createWechatMenuList({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.menuCreate, params })
    if (e.code === 0) {
        message.success('发布成功')
        yield call(getWechatMenuList)
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.wechat.GET_WECHAT_IFBIND, getWechatConfigInfo)
    yield takeEvery(types.wechat.GET_WECHAT_API_STATUS, getWechatApiStatus)
    yield takeEvery(types.wechat.SET_WECHAT_CONFIG, editWechatConfig)
    yield takeEvery(types.wechat.GET_WECHAT_MENU_LIST, getWechatMenuList)
    yield takeEvery(types.wechat.CREATE_WECHAT_MENU_LIST, createWechatMenuList)
}
