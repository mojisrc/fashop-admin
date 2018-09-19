import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { __DEV__ } from '../config/root'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

const { historyPrefix } = window.fashop
export const history = createBrowserHistory({ basename: __DEV__ ? historyPrefix : historyPrefix })
const sagaMiddleware = createSagaMiddleware()
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history),
    sagaMiddleware,
)(createStore);

const initialState = {}
const store = createStoreWithMiddleware(rootReducer, initialState);
sagaMiddleware.run(rootSaga)
export default store
