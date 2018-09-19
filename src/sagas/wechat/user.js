import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setWechatUserList,
    setWechatUserListByTag,
    setWechatUserBlackList,
    setWechatUserInfoList,
    setWechatUserInfoBlackList,
} from '../../actions/wechat/user';
import { WechatApi } from "../../config/api/wechat";

function* getWechatUserList({ params }) {
    yield put({
        type: types.wechat.START_GET_USER_LIST
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.userList, params })
    if (e.code === 0) {
        yield put(setWechatUserList({
            result: e.result,
            allUserListTotal: e.result.total,
            first: !params.next_openid
        }))
        yield call(getWechatUserInfoList, { params: { openids: e.result.data.openid.slice(0, 20) } })
    } else {
        message.warning(e.msg)
    }
}

function* getWechatUserBlackList() {
    yield put({
        type: types.wechat.START_GET_USER_BLACK_LIST
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.userBlackList })
    if (e.code === 0) {
        yield put(setWechatUserBlackList({ result: e.result }))
        if (e.result.total) {
            yield call(getWechatUserInfoList, { params: { openids: e.result.data.openid }, type: 'black' })
        }
    } else {
        message.warning(e.msg)
    }
}

function* getWechatUserInfoList({ params, type }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userSelect, params })
    if (e.code === 0) {
        if (type === 'black') {
            yield put(setWechatUserInfoBlackList({ result: e.result.user_info_list }))
        } else {
            yield put(setWechatUserInfoList({ result: e.result.user_info_list }))
        }
    } else {
        message.warning(e.msg)
    }
}

function* setUserBlock({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userBlock, params })
    if (e.code === 0) {
        message.success('成功加入黑名单')
        yield call(getWechatUserList, { params: {} })
        yield call(getWechatUserBlackList)
    } else {
        message.warning(e.msg)
    }
}

function* setUserUnblock({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userUnblock, params })
    if (e.code === 0) {
        message.success('成功移出黑名单')
        yield call(getWechatUserList, { params: {} })
        yield call(getWechatUserBlackList)
    } else {
        message.warning(e.msg)
    }
}

function* editUserRemark({ params, editType }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userRemark, params })
    if (e.code === 0) {
        message.success('修改成功')
        if (editType === 'black') {
            yield call(getWechatUserBlackList)
        } else {
            yield call(getWechatUserList, { params: {} })
        }
    } else {
        message.warning(e.msg)
    }
}

function* getWechatUserListByTag({ params }) {
    yield put({
        type: types.wechat.START_GET_USER_LIST_BY_TAG
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.userTagUsersOfTag, params })
    if (e.code === 0) {
        let openids = e.result.data && e.result.data.openid.slice(0, 20)
        if (openids) {
            yield put(setWechatUserListByTag({
                result: e.result,
            }))
            yield call(getWechatUserInfoList, { params: { openids } })
        } else {
            yield put(setWechatUserListByTag({
                result: {},
            }))
            yield put(setWechatUserInfoList({ result: [] }))
        }
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.wechat.GET_WECHAT_USER_LIST, getWechatUserList)
    yield takeEvery(types.wechat.GET_WECHAT_USER_LIST_BY_TAG, getWechatUserListByTag)
    yield takeEvery(types.wechat.GET_WECHAT_USER_BLACK_LIST, getWechatUserBlackList)
    yield takeEvery(types.wechat.GET_WECHAT_USER_INFO_LIST, getWechatUserInfoList)
    yield takeEvery(types.wechat.SET_WECHAT_USER_BLACK, setUserBlock)
    yield takeEvery(types.wechat.SET_WECHAT_USER_UNBLACK, setUserUnblock)
    yield takeEvery(types.wechat.EDIT_WECHAT_USER_REMARK, editUserRemark)
}
