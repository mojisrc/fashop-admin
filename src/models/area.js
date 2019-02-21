import area from "@/services/area";
import Arr from "@/utils/array";

export default {
    namespace: "area",
    state: {
        list: {
            result: { list: [] }
        },
        tree: {
            result: { list: [] }
        },
        cascader: {
            result: { list: [] }
        }
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            let response = {};
            const cache = localStorage.getItem("area.list");
            if (cache) {
                response = JSON.parse(cache);
            } else {
                response = yield call(area.list, {
                    level: 2
                });
                if (response.code === 0) {
                    localStorage.setItem("area.list", JSON.stringify(response));
                } else {
                    response = {
                        result: {
                            list: []
                        },
                        code: 0,
                        msg: null
                    };
                }
            }
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * tree({ payload, callback }, { call, put }) {
            let response = {
                result: {
                    list: []
                }
            };
            yield put.resolve({
                type: "list",
                payload: {},
                callback: (res) => {
                    response = res;
                }
            });

            let { result: { list } } = response;

            let tree = Arr.toTree(list);

            let _payload = {
                result: {
                    list: tree
                }
            };
            yield put({
                type: "_tree",
                payload: _payload
            });
            if (callback) callback(_payload);
        },
        * cascader({ payload, callback }, { call, put }) {
            let response = {
                result: {
                    list: []
                }
            };
            let tree = [];
            let cascader;
            yield put.resolve({
                type: "tree",
                callback: (res) => {
                    response = res;
                }
            });
            tree = response.result.list;
            cascader = Array.isArray(tree) && tree.length > 0 && tree.map((item) => {
                // 删除 区以下级别
                if (item.level <= 3) {
                    // 该模块主要为了全局的树形antd组件需要保留省市区
                    return {
                        label: `${item.name}`,
                        value: `${item.id}`,
                        key: `${item.id}`,
                        children: item._child.length > 0 ? item._child.map((sub) => {
                            return {
                                label: `${sub.name}`,
                                value: `${sub.id}`,
                                key: `${sub.id}`,
                                children: sub._child.length > 0 ? sub._child.map((area) => {
                                    return {
                                        label: `${area.name}`,
                                        value: `${area.id}`,
                                        key: `${area.id}`
                                    };
                                }) : []
                            };
                        }) : []
                    };
                }
            });
            const _payload = {
                result: {
                    list: cascader
                }
            };
            yield put({
                type: "_cascader",
                payload: _payload
            });
            if (callback) callback(_payload);
        }
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _tree(state, action) {
            return {
                ...state,
                tree: action.payload
            };
        },
        _cascader(state, action) {
            return {
                ...state,
                cascader: action.payload
            };
        }
    }
};
