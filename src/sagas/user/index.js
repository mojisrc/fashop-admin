import { takeEvery, call, put } from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import { saveUserList, saveUserInfo } from '../../actions/user';
import { UserApi } from "../../config/api/user";

function* getUserList({ params }) {
    yield put({ type: types.user.START_GET_USER_LIST })
    const e = yield call(Fetch.fetch, { api: UserApi.list, params })
    if (e.code === 0) {
        yield put(saveUserList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* getUserInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: UserApi.info, params })
    if (e.code === 0) {
        yield put(saveUserInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.user.GET_USER_LIST, getUserList)
    yield takeEvery(types.user.GET_USER_INFO, getUserInfo)
}
