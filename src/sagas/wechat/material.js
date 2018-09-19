import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setImageMaterialList,
    setVideoMaterialList,
    setVoiceMaterialList,
    setNewsMaterialList,
    setLocalNewsMaterialList,
    setWechatMaterialInfo,
    setLocalnewsMaterialInfo,
} from '../../actions/wechat/material';
import { goBack } from 'react-router-redux'
import { WechatApi } from "../../config/api/wechat";

function* getWechatMaterialList({ params }) {
    yield put({
        type: types.wechat.START_GET_MATERIAL_LIST
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.materialList, params })
    if (e.code === 0) {
        let currentPage = params.offset === '0' ? 1 : (Number(params.offset) + 1) / Number(params.count) + 1
        let pageSize = Number(params.count)
        switch (params.type) {
            case 'image':
                return yield put(setImageMaterialList({ result: e.result, currentPage, pageSize }))
            case 'video':
                return yield put(setVideoMaterialList({ result: e.result, currentPage, pageSize }))
            case 'voice':
                return yield put(setVoiceMaterialList({ result: e.result, currentPage, pageSize }))
            case 'news':
                return yield put(setNewsMaterialList({ result: e.result, currentPage, pageSize }))
            default:

        }
    } else {
        message.warning(e.msg)
    }
}

function* getLocalNewsMaterialList({ params }) {
    yield put({
        type: types.wechat.START_GET_LOCAL_NEWS_MATERIAL_LIST
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.localNews, params })
    if (e.code === 0) {
        yield put(setLocalNewsMaterialList({ result: e.result, currentPage: params.page, pageSize: params.rows }))
    } else {
        message.warning(e.msg)
    }
}

function* addWechatMaterial({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.materialUploadArticle, params })
    if (e.code === 0) {
        message.success('添加成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* editWechatMaterial({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.materialUpdateArticle, params })
    if (e.code === 0) {
        message.success('修改成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* delWechatMaterial({ params, callParams }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.materialDelete, params })
    if (e.code === 0) {
        message.success('已删除')
        yield call(getWechatMaterialList, { params: callParams })
    } else {
        message.warning(e.msg)
    }
}

function* addWechatMaterialVoice({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.materialUploadVoice, params })
    if (e.code === 0) {
        message.success('添加成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* addLocalNewsMaterialList({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.localNewsAdd, params })
    if (e.code === 0) {
        message.success('添加成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* editLocalNewsMaterialList({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.localNewsEdit, params })
    if (e.code === 0) {
        message.success('修改成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* delLocalNewsMaterialList({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.localNewsDel, params })
    if (e.code === 0) {
        message.success('已删除')
        yield call(getLocalNewsMaterialList, {
            params: {
                page: 1,
                rows: 10,
            }
        })
    } else {
        message.warning(e.msg)
    }
}

// 单条
function* getWechatMaterialInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.materialGet, params })
    if (e.code === 0) {
        yield put(setWechatMaterialInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* getLocalnewsMaterialInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.localNewsInfo, params })
    if (e.code === 0) {
        yield put(setLocalnewsMaterialInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.wechat.GET_MATERIAL_LIST, getWechatMaterialList)
    yield takeEvery(types.wechat.ADD_WECHAT_MATERIAL, addWechatMaterial)
    yield takeEvery(types.wechat.EDIT_WECHAT_MATERIAL, editWechatMaterial)
    yield takeEvery(types.wechat.DEL_WECHAT_MATERIAL, delWechatMaterial)
    yield takeEvery(types.wechat.ADD_WECHAT_MATERIAL_VOICE, addWechatMaterialVoice)
    yield takeEvery(types.wechat.GET_LOCAL_NEWS_MATERIAL_LIST, getLocalNewsMaterialList)
    yield takeEvery(types.wechat.ADD_LOCAL_NEWS_MATERIAL_LIST, addLocalNewsMaterialList)
    yield takeEvery(types.wechat.EDIT_LOCAL_NEWS_MATERIAL_LIST, editLocalNewsMaterialList)
    yield takeEvery(types.wechat.DEL_LOCAL_NEWS_MATERIAL_LIST, delLocalNewsMaterialList)
    yield takeEvery(types.wechat.GET_WECHAT_MATERIAL_INFO, getWechatMaterialInfo)
    yield takeEvery(types.wechat.GET_LOCALNEWS_MATERIAL_INFO, getLocalnewsMaterialInfo)
}
