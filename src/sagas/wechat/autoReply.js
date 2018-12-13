import { takeEvery, call, put } from 'redux-saga/effects'
import { Fetch } from '@/utils'
import types from '../../constants';
import { message } from 'antd';
import {
    saveAutoReplyStatus,
    saveKeyWordsReplyList,
    saveFollowedReplyInfo,
    setAutoReplyKeywordsInfo,
} from '../../actions/wechat/autoReply';
import { goBack } from 'react-router-redux'
import { WechatApi } from "../../config/api/wechat";

function* autoReplyStatus() {
    const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyStatusSet })
    if (e.code === 0) {
        yield put(saveAutoReplyStatus({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* setAutoReplyStatus({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyStatusSet, params })
    if (e.code === 0) {
        yield call(autoReplyStatus)
    } else {
        message.warning(e.msg)
    }
}

function* keyWordsReplyList({ params }) {
    yield put({
        type: types.wechat.START_GET_KEYWORDS_REPLY_LIST
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.replyKeywordsList, params })
    if (e.code === 0) {
        yield put(saveKeyWordsReplyList({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* delAutoReplyKeywords({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyKeywordsDel, params })
    if (e.code === 0) {
        message.success('已删除')
        yield call(keyWordsReplyList, { params: {} })
    } else {
        message.warning(e.msg)
    }
}

function* addAutoReplyKeywords({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyKeywordsAdd, params })
    if (e.code === 0) {
        message.success('添加成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* editAutoReplyKeywords({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyKeywordsEdit, params })
    if (e.code === 0) {
        message.success('修改成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* getAutoReplyKeywordsInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.autoReplyKeywordsInfo, params })
    if (e.code === 0) {
        yield put(setAutoReplyKeywordsInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* getFollowedReplyInfo() {
    const e = yield call(Fetch.fetch, { api: WechatApi.autoReplySubscribeGet })
    if (e.code === 0) {
        yield put(saveFollowedReplyInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* setFollowedReplyInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.autoReplySubscribeSet, params })
    if (e.code === 0) {
        message.success('保存成功')
        yield call(getFollowedReplyInfo)
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.wechat.GET_AUTO_REPLY_STATUS, autoReplyStatus)
    yield takeEvery(types.wechat.SET_AUTO_REPLY_STATUS, setAutoReplyStatus)
    yield takeEvery(types.wechat.GET_KEYWORDS_REPLY_LIST, keyWordsReplyList)
    yield takeEvery(types.wechat.DEL_AUTO_REPLY_KEYWORDS, delAutoReplyKeywords)
    yield takeEvery(types.wechat.ADD_AUTO_REPLY_KEYWORDS, addAutoReplyKeywords)
    yield takeEvery(types.wechat.EDIT_AUTO_REPLY_KEYWORDS, editAutoReplyKeywords)
    yield takeEvery(types.wechat.GET_AUTO_REPLY_KEYWORDS_DETAIL, getAutoReplyKeywordsInfo)
    yield takeEvery(types.wechat.GET_FOLLOWED_REPLY_INFO, getFollowedReplyInfo)
    yield takeEvery(types.wechat.SET_FOLLOWED_REPLY_INFO, setFollowedReplyInfo)
}
