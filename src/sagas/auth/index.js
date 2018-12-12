import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import { setRuleTree } from '../../models/auth';
import { AuthApi } from "../../config/api/auth";

function* groupList() {
    const e = yield call(Fetch.fetch, { api: AuthApi.groupList, params: { rows: 1000 } })
    if (e.code === 0) {
        yield put({
            type: types.auth.SET_AUTH_GROUPLIST,
            data: e.result.list,
        })
    } else {
        message.warning(e.msg)
    }
}

function* groupMemberList({ params }) {
    yield put({
        type: types.auth.GROUP_MEMBER_LIST_LOADING,
    })
    const e = yield call(Fetch.fetch, { api: AuthApi.groupMemberList, params })
    if (e.code === 0) {
        yield put({
            type: types.auth.SET_AUTH_GROUP_MEMBER_LIST,
            data: e.result.list,
        })
    } else {
        message.warning(e.msg)
    }
}


function* groupEdit({ id, name, func }) {
    const e = yield call(Fetch.fetch, { api: AuthApi.groupEdit, params: { id, name } })
    if (e.code === 0) {
        yield call(func)
        yield call(groupList)
    } else {
        message.warning(e.msg)
    }
}


function* getRuleTree() {
    const e = yield call(Fetch.fetch, { api: AuthApi.ruleTree })
    if (e.code === 0) {
        yield put(setRuleTree(e.result.tree))
    } else {
        // 禁止弹出msg为空的错误。。
        // message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.auth.GET_AUTH_GROUPLIST, groupList)
    yield takeEvery(types.auth.GET_AUTH_GROUP_MEMBER_LIST, groupMemberList)
    yield takeEvery(types.auth.AUTH_GROUPEDIT, groupEdit)
    yield takeEvery(types.auth.GET_RULE_TREE, getRuleTree)
}
