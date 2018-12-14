import area from "@/services/area";
export default {
    namespace: "area",
    state: {
        list: [],
        cascader: []
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(area.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback(response);
        },
        * cascader({ payload, callback }, { call, put }) {
            const response = yield call(area.list, { level: 2, tree: 1 });
            let result;
            if (response instanceof Error) {
                return [];
            } else {
                const { list } = response.result;
                result = Array.isArray(list) && list.length > 0 && list.map((item) => {
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
                });
            }
            yield put({
                type: "cascader",
                payload: result
            });
            if (callback) callback(response);
        }
    },

    reducers: {
        list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        cascader(state, action) {
            return {
                ...state,
                cascader: action.payload
            };
        }
    }
};
