import { takeEvery, call, put } from 'redux-saga/effects'
import { Fetch } from '@/utils'
import types from '../../constants';
import { message } from 'antd';
import { setList, setInfo } from '../../actions/user';
import { UserApi } from "../../config/api/user";

function* list({ params }) {
    yield put({ type: types.user.START_GET_USER_LIST })
    const e = yield call(Fetch.fetch, { api: UserApi.list, params })
    if (e.code === 0) {
        yield put(setList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* info({ params }) {
    const e = yield call(Fetch.fetch, { api: UserApi.info, params })
    if (e.code === 0) {
        yield put(setInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.user.GET_USER_LIST, list)
    yield takeEvery(types.user.GET_USER_INFO, info)
}
