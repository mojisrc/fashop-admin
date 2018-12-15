import area from "@/services/area";

export default {
    namespace: "area",
    state: {
        list: {},
        tree: {},
        cascader: []
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            let response = {};
            const cache = localStorage.getItem("area.list");
            if (cache) {
                response = JSON.parse(cache);
            } else {
                response = yield call(area.list, {});
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
            let response;
            yield put({
                type: "list",
                payload: {},
                callback: (res) => {
                    response = res;
                }
            });
            let { result: { list } } = response;
            let toTree = (data) => {
                // 将数据存储为 以 id 为 KEY 的 map 索引数据列
                var map = {};
                data.forEach(function(item) {
                    // 删除 所有 children,以防止多次调用
                    if (typeof item["children"] === "undefined") {
                        delete item.children;
                    }
                    map[item.id] = item;
                });
                var val = [];
                data.forEach(function(item) {
                    // 以当前遍历项，的pid,去map对象中找到索引的id
                    var parent = map[item.pid];
                    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
                    if (parent) {
                        (parent["children"] || (parent["children"] = [])).push(item);
                    } else {
                        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                        val.push(item);
                    }
                });
                return val;
            };
            let tree = toTree(list);
            yield put({
                type: "_tree",
                payload: tree
            });
            if (callback) callback(tree);
        },
        * cascader({ payload, callback }, { call, put }) {
            let tree = [];
            let cascader;
            yield put({
                type: "tree",
                payload: {},
                callback: (res) => {
                    tree = res;
                }
            });
            cascader = Array.isArray(tree) && tree.length > 0 && tree.map((item) => {
                // 删除 区以下级别
                if (item.level <= 3) {
                    // 该模块主要为了全局的树形antd组件需要保留省市区
                    return {
                        value: item.id,
                        label: item.name,
                        children: item._child.length > 0 ? item._child.map((sub) => {
                            return {
                                value: sub.id,
                                label: sub.name,
                                children: sub._child.length > 0 ? sub._child.map((area) => {
                                    return {
                                        value: area.id,
                                        label: area.name
                                    };
                                }) : []
                            };
                        }) : []
                    };
                }
            });
            yield put({
                type: "_cascader",
                payload: cascader
            });
            if (callback) callback(cascader);
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
            cascader(state, action) {
                return {
                    ...state,
                    cascader: action.payload
                };
            }
        }
    }
};
