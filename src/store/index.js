import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { __DEV__ } from '../config/root'


