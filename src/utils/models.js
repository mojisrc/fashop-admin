'use strict'

import fa from "@/utils/fa";

export default class Models {
    /**
     * 自动生成 models services
     * @param model
     * @param model.namespace
     * @param model.services
     * @returns {*|Promise<*>|PromiseLike<T | never>|Promise<T | never>}
     */
    static create({ namespace, services }) {
        return {
            namespace,
            state: services,
            effects: this.getEffects(services),
            reducers: this.getReducers(services)
        }
    }
    static getEffects(services){
        let result = {}
        for (let i in services) {
            const type = `_${i}`
            let item = {
                * [i]({ payload, callback }, { call, put }) {
                    const request = (data = {}) => {
                        return fa.request({
                            url: `/admin/order/list`,
                            method: "GET",
                            data
                        });
                    }
                    const response = yield call(request, payload);
                    yield put({
                        type,
                        payload: response
                    });
                    if (callback) callback(response);
                }
            }
            result = {
                ...result,
                ...item
            }
        }
        console.log("getEffects-2", result);
        return result
        // return {
        //     * list({ payload, callback }, { call, put }) {
        //         const response = yield call(order.list, payload);
        //         yield put({
        //             type: "_list",
        //             payload: response
        //         });
        //         if (callback) callback(response);
        //     },
        // }
    }
    static getReducers(services){
        let result = {}
        for (let i in services) {
            let name = `_${i}`
            let item = {
                [name](state, action) {
                    return { ...state, [result[i]]: action.payload }
                }
            }
            result = {
                ...result,
                ...item
            }
        }
        console.log("getReducers-2", result);
        return result
        // return {
        //     _list(state, action) {
        //         return {
        //             ...state,
        //             list: action.payload
        //         };
        //     }
        // }
    }
}
