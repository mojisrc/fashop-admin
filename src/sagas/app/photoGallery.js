import { takeEvery, call, put, select } from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import { setList } from '../../models/photoGallery';
import { ImageApi } from '../../config/api/image'

function* getList({ params }) {
    const { imageList: result } = yield select(({ app: { app: { imageList } } }) => ({ imageList }))
    yield put(setList({
        params,
        result,
        loading: true,
    }))
    const e = yield call(Fetch.fetch, { api: ImageApi.list, params })
    if (e.code === 0) {
        const {
            result
        } = e
        yield put(setList({
            params,
            result,
            loading: false,
        }))
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.app.GET_GOODS_IMAGE_LIST, getList)
}
