export default {
    namespace: "setting1",

    state: {
        list: []
    },

    effects: {

        * areaList() {
            return dispatch => {
                dispatch({
                    type: types.setting.get_area_list
                });
            };
        },


        * setAreaList({ list }) {
            return dispatch => {
                dispatch({
                    type: types.setting.SET_AREA_LIST,
                    list
                });
            };
        },


        * setingPay({ payload, callback }, { call, put }) {
            return dispatch => {
                dispatch({
                    type: types.setting.SETTING_PAY,
                    params
                });
            };
        },

        * settingSmspro({ payload, callback }, { call, put }) {
            return dispatch => {
                dispatch({
                    type: types.setting.PSETTING_SMSPROVIDER,
                    params
                });
            };
        },

        * sendSmscene() {
            return dispatch => {
                dispatch({
                    type: types.setting.SMSLIST_SETTING
                });
            };
        },

        * receiveSmslist({ list }) {
            return dispatch => {
                dispatch({
                    type: types.setting.CREEIVESMSLIST_SETTING,
                    list
                });
            };
        },

        * smsScenceedit({ payload, callback }, { call, put }) {
            return dispatch => {
                dispatch({
                    type: types.setting.SMSSCENCEEDIT_SEETING,
                    params
                });
            };
        },

        * sendSmsinfo({ payload, callback }, { call, put }) {
            return dispatch => {
                dispatch({
                    type: types.setting.SMSSCENEINFO_SETTING,
                    params
                });
            };
        },

        * getInfoMessage({ info }) {
            return dispatch => {
                dispatch({
                    type: types.setting.GETSMSCENEINFO_SETTING,
                    info
                });
            };
        },


        * getList() {
            const e = yield call(Fetch.fetch, { api: AreaApi.list, params: { level: 2, tree: 1 } });
            if (e.code === 0) {
                const {
                    list
                } = e.result;
                yield put(setAreaList({ list }));
            } else {
                message.warning(e.msg);
            }
        },

// todo  是啥
        * setpay({ payload, callback }, { call, put }) {
            const e = yield call(Fetch.fetch, { api: "PAYSEETING", params });
            if (e.code === 0) {
                message.success("设置成功");
            } else {
                message.warning(e.msg);
            }
        },

        * setSmsProvide({ payload, callback }, { call, put }) {
            const e = yield call(Fetch.fetch, { api: SmsApi.provider.edit, params });
            if (e.code === 0) {
                message.success("保存成功");
            } else {
                message.warning(e.msg);
            }
        },

// todo 这是啥
        * settingSmscen() {
            const e = yield call(Fetch.fetch, { api: "SMSSCEN" });
            if (e.code === 0) {
                const {
                    list
                } = e.result;
                yield put(receiveSmslist({ list }));
            } else {
                message.warning(e.msg);
            }
        },

// todo 这是啥
        * sendSmsScence({ payload, callback }, { call, put }) {
            const e = yield call(Fetch.fetch, { api: SmsApi.scene.edit, params });
            if (e.code === 0) {
                message.success("保存成功");
            } else {
                message.warning(e.msg);
            }
        },

        * sendSmsScenceInfo({ payload, callback }, { call, put }) {
            const e = yield call(Fetch.fetch, { api: SmsApi.scene.info, params });
            if (e.code === 0) {
                const { info } = e.result;
                yield put(getInfoMessage({ info }));
            } else {
                message.warning(e.msg);
            }
        }
    },

    reducers: {
        queryList(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        appendList(state, action) {
            return {
                ...state,
                list: state.list.concat(action.payload)
            };
        }
    }
};
