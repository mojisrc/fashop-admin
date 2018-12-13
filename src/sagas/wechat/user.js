import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '@/utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setUserList,
    setUserListByTag,
    setUserBlackList,
    setUserInfoList,
    setUserInfoBlackList,
} from '../../actions/wechat/user';
import { WechatApi } from "../../config/api/wechat";

function* getUserList({ params }) {
    yield put({
        type: types.wechat.START_GET_USER_LIST
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.userList, params })
    if (e.code === 0) {
        yield put(setUserList({
            result: e.result,
            allUserListTotal: e.result.total,
            first: !params.next_openid
        }))
        yield call(getUserInfoList, { params: { openids: e.result.data.openid.slice(0, 20) } })
    } else {
        message.warning(e.msg)
    }
}

function* getUserBlackList() {
    yield put({
        type: types.wechat.START_GET_USER_BLACK_LIST
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.userBlackList })
    if (e.code === 0) {
        yield put(setUserBlackList({ result: e.result }))
        if (e.result.total) {
            yield call(getUserInfoList, { params: { openids: e.result.data.openid }, type: 'black' })
        }
    } else {
        message.warning(e.msg)
    }
}

function* getUserInfoList({ params, type }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userSelect, params })
    if (e.code === 0) {
        if (type === 'black') {
            yield put(setUserInfoBlackList({ result: e.result.user_info_list }))
        } else {
            yield put(setUserInfoList({ result: e.result.user_info_list }))
        }
    } else {
        message.warning(e.msg)
    }
}

function* setUserBlock({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userBlock, params })
    if (e.code === 0) {
        message.success('成功加入黑名单')
        yield call(getUserList, { params: {} })
        yield call(getUserBlackList)
    } else {
        message.warning(e.msg)
    }
}

function* setUserUnblock({ params }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userUnblock, params })
    if (e.code === 0) {
        message.success('成功移出黑名单')
        yield call(getUserList, { params: {} })
        yield call(getUserBlackList)
    } else {
        message.warning(e.msg)
    }
}

function* editUserRemark({ params, editType }) {
    const e = yield call(Fetch.fetch, { api: WechatApi.userRemark, params })
    if (e.code === 0) {
        message.success('修改成功')
        if (editType === 'black') {
            yield call(getUserBlackList)
        } else {
            yield call(getUserList, { params: {} })
        }
    } else {
        message.warning(e.msg)
    }
}

function* getUserListByTag({ params }) {
    yield put({
        type: types.wechat.START_GET_USER_LIST_BY_TAG
    })
    const e = yield call(Fetch.fetch, { api: WechatApi.userTagUsersOfTag, params })
    if (e.code === 0) {
        let openids = e.result.data && e.result.data.openid.slice(0, 20)
        if (openids) {
            yield put(setUserListByTag({
                result: e.result,
            }))
            yield call(getUserInfoList, { params: { openids } })
        } else {
            yield put(setUserListByTag({
                result: {},
            }))
            yield put(setUserInfoList({ result: [] }))
        }
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.wechat.GET_WECHAT_USER_LIST, getUserList)
    yield takeEvery(types.wechat.GET_WECHAT_USER_LIST_BY_TAG, getUserListByTag)
    yield takeEvery(types.wechat.GET_WECHAT_USER_BLACK_LIST, getUserBlackList)
    yield takeEvery(types.wechat.GET_WECHAT_USER_INFO_LIST, getUserInfoList)
    yield takeEvery(types.wechat.SET_WECHAT_USER_BLACK, setUserBlock)
    yield takeEvery(types.wechat.SET_WECHAT_USER_UNBLACK, setUserUnblock)
    yield takeEvery(types.wechat.EDIT_WECHAT_USER_REMARK, editUserRemark)
}
