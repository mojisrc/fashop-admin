export default {
  namespace: "wechatMaterial",

  state: {
    list: []
  },

  effects: {
    * wechatMaterialList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_material_list,
          params
        });
      };
    },

    * setImageMaterialList({ result, currentPage, pageSize }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_image_material_list,
          imageMaterialList: result,
          currentPage,
          pageSize
        });
      };
    },

    * setVideoMaterialList({ result, currentPage, pageSize }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_video_material_list,
          videoMaterialList: result,
          currentPage,
          pageSize
        });
      };
    },

    * setVoiceMaterialList({ result, currentPage, pageSize }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_voice_material_list,
          voiceMaterialList: result,
          currentPage,
          pageSize
        });
      };
    },

    * setNewsMaterialList({ result, currentPage, pageSize }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_news_material_list,
          newsMaterialList: result,
          currentPage,
          pageSize
        });
      };
    },

    * getLocalNewsMaterialList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_local_news_material_list,
          params
        });
      };
    },
    * setLocalNewsMaterialList({ result, currentPage, pageSize }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_local_news_material_list,
          localNewsMaterialList: result,
          currentPage,
          pageSize
        });
      };
    },

    * addMaterial({ payload }, { call, put }) {
      console.log(params);
      return dispatch => {
        dispatch({
          type: types.wechat.add_wechat_material,
          params
        });
      };
    },

    * editMaterial({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.edit_wechat_material,
          params
        });
      };
    },

    * delMaterialerial({ params, callParams }) {
      return dispatch => {
        dispatch({
          type: types.wechat.del_wechat_material,
          params,
          callParams
        });
      };
    },

    * addMaterialVoice({ payload }, { call, put }) {
      console.log(params);
      return dispatch => {
        dispatch({
          type: types.wechat.add_wechat_material_voice,
          params
        });
      };
    },

    * addLocalNewsMaterialList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.add_local_news_material_list,
          params
        });
      };
    },

    * editLocalNewsMaterialList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.edit_local_news_material_list,
          params
        });
      };
    },

    * delLocalNewsMaterialList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.del_local_news_material_list,
          params
        });
      };
    },

    * getMaterialInfo({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_wechat_material_info,
          params
        });
      };
    },
    * getLocalnewsMaterialInfo({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.wechat.get_localnews_material_info,
          params
        });
      };
    },
    * setMaterialInfo({ result }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_wechat_material_info,
          wechatMaterialInfo: result
        });
      };
    },

    * setLocalnewsMaterialInfo({ result }) {
      return dispatch => {
        dispatch({
          type: types.wechat.set_localnews_material_info,
          localnewsMaterialInfo: result
        });
      };
    },


    * wechatMaterialList({ payload }, { call, put }) {
      yield put({
        type: types.wechat.START_GET_MATERIAL_LIST
      });
      const e = yield call(Fetch.fetch, { api: WechatApi.wechatMaterialList, params });
      if (e.code === 0) {
        let currentPage = params.offset === "0" ? 1 : (Number(params.offset) + 1) / Number(params.count) + 1;
        let pageSize = Number(params.count);
        switch (params.type) {
          case "image":
            return yield put(setImageMaterialList({ result: e.result, currentPage, pageSize }));
          case "video":
            return yield put(setVideoMaterialList({ result: e.result, currentPage, pageSize }));
          case "voice":
            return yield put(setVoiceMaterialList({ result: e.result, currentPage, pageSize }));
          case "news":
            return yield put(setNewsMaterialList({ result: e.result, currentPage, pageSize }));
          default:

        }
      } else {
        message.warning(e.msg);
      }
    },

    * getLocalNewsMaterialList({ payload }, { call, put }) {
      yield put({
        type: types.wechat.START_GET_LOCAL_NEWS_MATERIAL_LIST
      });
      const e = yield call(Fetch.fetch, { api: WechatApi.localNews, params });
      if (e.code === 0) {
        yield put(setLocalNewsMaterialList({ result: e.result, currentPage: params.page, pageSize: params.rows }));
      } else {
        message.warning(e.msg);
      }
    },

    * addMaterial({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.materialUploadArticle, params });
      if (e.code === 0) {
        message.success("添加成功");
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },

    * editMaterial({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.materialUpdateArticle, params });
      if (e.code === 0) {
        message.success("修改成功");
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },

    * delMaterialerial({ params, callParams }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.materialDelete, params });
      if (e.code === 0) {
        message.success("已删除");
        yield call(wechatMaterialList, { params: callParams });
      } else {
        message.warning(e.msg);
      }
    },

    * addMaterialVoice({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.materialUploadVoice, params });
      if (e.code === 0) {
        message.success("添加成功");
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },

    * addLocalNewsMaterialList({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.localNewsAdd, params });
      if (e.code === 0) {
        message.success("添加成功");
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },

    * editLocalNewsMaterialList({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.localNewsEdit, params });
      if (e.code === 0) {
        message.success("修改成功");
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },

    * delLocalNewsMaterialList({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.localNewsDel, params });
      if (e.code === 0) {
        message.success("已删除");
        yield call(getLocalNewsMaterialList, {
          params: {
            page: 1,
            rows: 10
          }
        });
      } else {
        message.warning(e.msg);
      }
    },

// 单条
    * getMaterialInfo({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.materialGet, params });
      if (e.code === 0) {
        yield put(setMaterialInfo({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * getLocalnewsMaterialInfo({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: WechatApi.localNewsInfo, params });
      if (e.code === 0) {
        yield put(setLocalnewsMaterialInfo({ result: e.result }));
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
