'use strict'

import fa from "./fa";
// todo 增加state名字
export default class Model {
  namespace = ''
  api = []
  state = {}
  effects = {}
  reducers = {}
  subscriptions = {}
  props = {
    state: {},
    effects: {},
    reducers: {}
  }

  constructor({ namespace = '', api = [], state = {}, effects = {}, reducers = {},subscriptions = {} }) {
    this.namespace = namespace
    this.api = api
    this.subscriptions = subscriptions
    this.props = {
      state,
      effects,
      reducers,
      subscriptions
    }
  }
  static getInstance(options){
    return new Model(options)
  }
  create() {
    this.initState()
    this.initEffects()
    this.initReducers()
    return {
      namespace: this.namespace,
      state: this.state,
      effects: this.effects,
      reducers: this.reducers,
      subscriptions:this.subscriptions
    }
  }

  initState() {
    this.api.map((item) => {
      const requestInfo = this.parseRequest(item.request)
      let obj = {}
      obj[requestInfo.action] = item.response
      Object.assign(this.state, obj)
    })
    Object.assign(this.state, this.props.state)
  }

  initEffects() {
    this.api.map((item) => {
      const requestInfo = this.parseRequest(item.request)
      let obj = {}
      const action = requestInfo.action
      obj[requestInfo.action] = function* ({ payload, callback }, { call, put }) {
        const req = async (data = {}) => {
          return fa.request({
            url: `/${requestInfo.module}/${requestInfo.controller}/${requestInfo.action}`,
            method: requestInfo.method,
            data
          });
        }
        const response = yield call(req, payload);
        yield put({
          type: `_${action}`,
          payload: response
        });
        if (callback) callback(response);
      }
      Object.assign(this.effects, obj)
    })
    Object.assign(this.effects, this.props.effects)
  }

  initReducers() {
    let reducers = {}
    this.api.map((item) => {
      const requestInfo = this.parseRequest(item.request)
      const action = requestInfo.action
      reducers[`_${action}`] = function (state, actions) {
        let obj = state
        obj[action] = actions.payload
        return obj
      }
    })
    this.reducers = reducers
    Object.assign(this.reducers, this.props.reducers)
  }

  // str 如 GET /admin/goods/list
  parseRequest(str) {
    const arr = str.split(" ");
    const routerInfo = arr[1].split("/");
    return {
      method: arr[0],
      module: routerInfo[1],
      controller: routerInfo[2],
      action: routerInfo[3],
    }
  }

}
