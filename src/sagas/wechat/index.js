import {takeEvery, call, put} from 'redux-saga/effects'
import { Fetch} from '@/utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setConfigInfo,
    setApiStatus,
    setMenuList,
} from '../../models/wechat';
import { WechatApi } from "../../config/api/wechat";

function* configInfo() {
    const e = yield call(Fetch.fetch, { api: WechatApi.getConf })
    if (e.code === 0) {
        yield put(setConfigInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* apiStatus() {
    const e = yield call(Fetch.fetch, { api: WechatApi.checkApiStatus })
    if (e.code === 0) {
        yield put(setApiStatus({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* editConfig({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.confSet, params })
    if (e.code === 0) {
        message.success('操作成功！')
        yield call(configInfo)
    } else {
        message.warning(e.msg)
    }
}

function* menuList() {
    const e = yield call(Fetch.fetch, { api: WechatApi.menuList })
    if (e.code === 0) {
        yield put(setMenuList({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* createMenuList({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.menuCreate, params })
    if (e.code === 0) {
        message.success('发布成功')
        yield call(menuList)
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.wechat.GET_WECHAT_IFBIND, configInfo)
    yield takeEvery(types.wechat.GET_WECHAT_API_STATUS, apiStatus)
    yield takeEvery(types.wechat.SET_WECHAT_CONFIG, editConfig)
    yield takeEvery(types.wechat.GET_WECHAT_MENU_LIST, menuList)
    yield takeEvery(types.wechat.CREATE_WECHAT_MENU_LIST, createMenuList)
}
