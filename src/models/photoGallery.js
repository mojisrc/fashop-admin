export default {
  namespace: "photoGallery",

  state: {
    list: []
  },

  effects: {

    * getPhotoGalleryList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.app.get_goods_image_list,
          params
        });
      };
    },


    * setList({ params, result, loading }) {
      return dispatch => {
        const {
          page,
          rows
        } = params;
        const {
          total_number,
          list
        } = result;
        dispatch({
          type: types.app.set_goods_image_list,
          data: {
            page,
            rows,
            total_number,
            list,
            loading
          }
        });
      };
    },


    * getList({ payload }, { call, put }) {
      const { imageList: result } = yield select(({ app: { app: { imageList } } }) => ({ imageList }));
      yield put(setList({
        params,
        result,
        loading: true
      }));
      const e = yield call(Fetch.fetch, { api: ImageApi.list, params });
      if (e.code === 0) {
        const {
          result
        } = e;
        yield put(setList({
          params,
          result,
          loading: false
        }));
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
