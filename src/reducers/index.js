import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import member from './member';
import setting from './setting';
import app from './app';
import auth from './auth';
import goods from './goods'
import statistics from './statistics'
import shipper from './shipper'
import freight from './freight'
import express from './express'
import wechat from './wechat'
import shop from './shop'
import order from './order'
import user from './user'
import payment from './payment'

const rootReducer = combineReducers({
    app: combineReducers({
        member,
        app,
        setting,
    }),
    auth: combineReducers({
        auth,
    }),
    view: combineReducers({
        statistics,
        goods,
        shop,
        wechat,
        shipper,
        freight,
        express,
        order,
        user,
        payment
    }),
    router: routerReducer
});

export default rootReducer;
