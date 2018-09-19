import { takeEvery, put } from 'redux-saga/effects'
import types from '../../constants';

function* siderCollapse({ collapsed }) {
    yield put({
        type: types.app.SET_SIDER_COLLAPSE,
        collapsed,
    })
}

export default function* rootSaga() {
    yield takeEvery(types.app.APP_SIDER_COLLAPSE, siderCollapse)

}
