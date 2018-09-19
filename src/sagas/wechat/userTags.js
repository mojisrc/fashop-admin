import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setWechatUserTagList,
} from '../../actions/wechat/userTags';
import { WechatApi } from "../../config/api/wechat";

function* getWechatUserTagList() {
    const e = yield call(Fetch.fetch, { api: WechatApi.userTagList })
    if (e.code === 0) {
        yield put(setWechatUserTagList({ result: e.result.tags }))
    } else {
        message.warning(e.msg)
    }
}

function* addWechatUserTagList({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userTagCreate, params })
    if (e.code === 0) {
        message.success('修改成功')
        yield call(getWechatUserTagList)
    } else {
        message.warning(e.msg)
    }
}

function* editWechatUserTagList({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userTagUpdate, params })
    if (e.code === 0) {
        message.success('修改成功')
        yield call(getWechatUserTagList)
    } else {
        message.warning(e.msg)
    }
}

function* delWechatUserTagList({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userTagDelete, params })
    if (e.code === 0) {
        message.success('已删除')
        yield call(getWechatUserTagList)
    } else {
        message.warning(e.msg)
    }
}

function* wechatUserTagTagUsers({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userTagTagUsers, params })
    if (e.code === 0) {
        message.success('成功加入标签')
        yield call(getWechatUserTagList)
    } else {
        message.warning(e.msg)
    }
}

function* wechatUserTagUntagUsers({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userTagUntagUsers, params })
    if (e.code === 0) {
        message.success('成功移除标签')
        yield call(getWechatUserTagList)
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.wechat.GET_WECHAT_USER_TAG_LIST, getWechatUserTagList)
    yield takeEvery(types.wechat.ADD_WECHAT_USER_TAG_LIST, addWechatUserTagList)
    yield takeEvery(types.wechat.EDIT_WECHAT_USER_TAG_LIST, editWechatUserTagList)
    yield takeEvery(types.wechat.DEL_WECHAT_USER_TAG_LIST, delWechatUserTagList)
    yield takeEvery(types.wechat.TAG_WECHAT_USER, wechatUserTagTagUsers)
    yield takeEvery(types.wechat.UNTAG_WECHAT_USER, wechatUserTagUntagUsers)
}
