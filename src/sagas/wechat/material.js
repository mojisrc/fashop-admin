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
    setMaterialInfo,
    setLocalnewsMaterialInfo,
} from '../../actions/wechat/material';
import { goBack } from 'react-router-redux'
import { WechatApi } from "../../config/api/wechat";

function* wechatMaterialList({ params }) {
    yield put({
        type: types.wechat.START_GET_MATERIAL_LIST
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.wechatMaterialList, params })
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

function* addMaterial({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.materialUploadArticle, params })
    if (e.code === 0) {
        message.success('添加成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* editMaterial({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.materialUpdateArticle, params })
    if (e.code === 0) {
        message.success('修改成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* delMaterialerial({ params, callParams }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.materialDelete, params })
    if (e.code === 0) {
        message.success('已删除')
        yield call(wechatMaterialList, { params: callParams })
    } else {
        message.warning(e.msg)
    }
}

function* addMaterialVoice({ params }) {
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
function* getMaterialInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.materialGet, params })
    if (e.code === 0) {
        yield put(setMaterialInfo({ result: e.result }))
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
    yield takeEvery(types.wechat.GET_MATERIAL_LIST, wechatMaterialList)
    yield takeEvery(types.wechat.ADD_WECHAT_MATERIAL, addMaterial)
    yield takeEvery(types.wechat.EDIT_WECHAT_MATERIAL, editMaterial)
    yield takeEvery(types.wechat.DEL_WECHAT_MATERIAL, delMaterialerial)
    yield takeEvery(types.wechat.ADD_WECHAT_MATERIAL_VOICE, addMaterialVoice)
    yield takeEvery(types.wechat.GET_LOCAL_NEWS_MATERIAL_LIST, getLocalNewsMaterialList)
    yield takeEvery(types.wechat.ADD_LOCAL_NEWS_MATERIAL_LIST, addLocalNewsMaterialList)
    yield takeEvery(types.wechat.EDIT_LOCAL_NEWS_MATERIAL_LIST, editLocalNewsMaterialList)
    yield takeEvery(types.wechat.DEL_LOCAL_NEWS_MATERIAL_LIST, delLocalNewsMaterialList)
    yield takeEvery(types.wechat.GET_WECHAT_MATERIAL_INFO, getMaterialInfo)
    yield takeEvery(types.wechat.GET_LOCALNEWS_MATERIAL_INFO, getLocalnewsMaterialInfo)
}
