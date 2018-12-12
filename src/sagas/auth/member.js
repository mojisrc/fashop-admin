import { takeEvery, call, put } from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    getMemberList,
    setMemberList,
    addMemberButtonLoading,
    editMemberButtonLoading,
} from '../../actions/member';
import { MemberApi } from "../../config/api/member";


function* memberList() {
    yield put(getMemberList())
    const e = yield call(Fetch.fetch, { api: MemberApi.list })
    if (e.code === 0) {
        yield put(setMemberList({
            data: e.result,
        }))
    } else {
        message.warning(e.msg)
    }
}


function* addMember({ params, func }) {
    yield put(addMemberButtonLoading({
        loading: true
    }))
    try {
        const e = yield call(Fetch.fetch, { api: MemberApi.add, params })
        if (e.code === 0) {
            message.success('添加成功')
            yield call(func)
            yield call(memberList)
        } else {
            message.warning(e.msg)
        }
        yield put(addMemberButtonLoading({
            loading: false
        }))
    } catch (err) {
        message.error(err.toString())
    }
}


function* editMember({ params, func }) {
    yield put(editMemberButtonLoading({
        loading: true
    }))
    try {
        const e = yield call(Fetch.fetch, { api: MemberApi.edit, params })
        if (e.code === 0) {
            message.success('修改成功')
            yield call(func)
            yield call(memberList)
        } else {
            message.warning(e.msg)
        }
        yield put(editMemberButtonLoading({
            loading: false
        }))
    } catch (err) {
        message.error(err.toString())
    }
}


function* memberDel({ params }) {
    const e = yield call(Fetch.fetch, { api: MemberApi.del, params })
    if (e.code === 0) {
        message.info('已删除')
        yield call(memberList)
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.member.MEMBER_LIST_LOADING, memberList)
    yield takeEvery(types.member.MEMBER_ADD, addMember)
    yield takeEvery(types.member.MEMBER_EDIT, editMember)
    yield takeEvery(types.member.MEMBER_DEL, memberDel)


}
