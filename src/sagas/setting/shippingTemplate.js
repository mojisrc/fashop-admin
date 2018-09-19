import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setShippingTemplateList,
} from '../../actions/setting/shippingTemplate';
import { FreightApi } from "../../config/api/freight";

function* getList({ callback }) {
    const e = yield call(Fetch.fetch, { api: FreightApi.list })
    if (e.code === 0) {
        const {
            list
        } = e.result
        yield put(setShippingTemplateList({ list }))
        yield callback && callback()
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.setting.GET_FREIGHT_LIST, getList)

}
