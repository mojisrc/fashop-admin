import { takeEvery, call, put } from 'redux-saga/effects'
import { Fetch } from '@/utils'
import types from '../../constants';
import { message } from 'antd';
import {
    groupList,
    selectRuleids,
} from '../../models/role';
import { AuthApi } from "../../config/api/auth";

function* groupAdd({ params, func }) {
    const e = yield call(Fetch.fetch, { api: AuthApi.groupAdd, params })
    if (e.code === 0) {
        yield call(func)
        yield put(groupList())
    } else {
        message.warning(e.msg)
    }
}


function* groupDel({ params, func }) {
    const e = yield call(Fetch.fetch, { api: AuthApi.groupDel, params })
    if (e.code === 0) {
        yield call(func)
        yield put(groupList())
    } else {
        message.warning(e.msg)
    }
}


function* groupMemberEdit({ params, func }) {
    const e = yield call(Fetch.fetch, { api: AuthApi.groupMemberEdit, params })
    if (e.code === 0) {
        yield call(func)
    } else {
        message.warning(e.msg)
    }
}

function* groupAuthInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: AuthApi.groupInfo, params })
    if (e.code === 0) {
        const {
            rule_ids
        } = e.result.info
        yield put(selectRuleids({
            rule_ids
        }))
    } else {
        message.warning(e.msg)
    }
}


function* saveAuthRuleids({ params, func }) {
    const e = yield call(Fetch.fetch, { api: AuthApi.groupAuthorise, params })
    if (e.code === 0) {
        message.success('保存成功')
        yield call(func)
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.auth.GROUP_ADD, groupAdd)
    yield takeEvery(types.auth.GROUP_DEL, groupDel)
    yield takeEvery(types.auth.GROUP_MEMBER_EDIT, groupMemberEdit)
    yield takeEvery(types.auth.GET_GROUP_AUTH_INFO, groupAuthInfo)
    yield takeEvery(types.auth.SAVE_AUTH_RULEIDS, saveAuthRuleids)

}
