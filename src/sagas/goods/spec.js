import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch} from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setGoodsSpecList,
} from '../../actions/goods/spec';
import { GoodsApi } from "../../config/api/goods";

function* getList() {
    const e = yield call(Fetch.fetch, { api: GoodsApi.spec.list })
    if (e.code === 0) {
        const {
            list
        } = e.result
        yield put(setGoodsSpecList({ list }))
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.goods.GET_GOODS_SPEC_LIST, getList)

}
