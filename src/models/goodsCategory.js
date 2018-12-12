export default {
  namespace: "goodsCategory",

  state: {
    list: []
  },

  effects: {

    * list() {
      return dispatch => {
        dispatch({
          type: types.goods.get_goods_category_list
        });
      };
    },

    tree(list) {
      const newArray = [];
      list.map((e) => {
        e.children = e._child;
        delete e._child;
        newArray.push(e);
        if (e.children.length) {
          return tree(e.children);
        }
      });
      return newArray;
    },
// new array 这些需要重构名字 太懵逼了
    toList(list) {
      let newArray = [];
      const newArray2 = [];
      list.map((e) => {
        newArray.push(e);
        if (e.children && e.children.length) {
          e.children.map((a) => {
            newArray.push(a);
          });
        }
      });
      newArray.map((e) => {
        if (e.children) {
          delete e.children;
        }
        newArray2.push(e);
      });
      return newArray2;
    },

    * setList({ list }) {
      return dispatch => {
        const categoryTree = JSON.parse(JSON.stringify(list));
        tree(categoryTree);
        const categoryList = toList(JSON.parse(JSON.stringify(categoryTree)));
        dispatch({
          type: types.goods.set_goods_category_list,
          categoryTree,
          categoryList
        });
      };
    },


    * add({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.goods.add_goods_category,
          params
        });
      };
    },


    * edit({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.goods.edit_goods_category,
          params
        });
      };
    },


    * del({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.goods.del_goods_category,
          params
        });
      };
    },


    * sort({ params, func }) {
      return dispatch => {
        dispatch({
          type: types.goods.sort_goods_category,
          params,
          func
        });
      };
    },


    * specList() {
      return dispatch => {
        dispatch({
          type: types.goods.get_goods_spec_list
        });
      };
    },

    * setSpecList({ list }) {
      return dispatch => {
        dispatch({
          type: types.goods.set_goods_spec_list,
          list
        });
      };
    },
    * getList() {
      yield put({
        type: types.goods.START_GET_GOODS_CATEGORY_LIST
      });
      const e = yield call(Fetch.fetch, { api: GoodsApi.category.list });
      if (e.code === 0) {
        const {
          list
        } = e.result;
        yield put(setList({ list }));
      } else {
        message.warning(e.msg);
      }
    },

    * add({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: GoodsApi.category.add, params });
      if (e.code === 0) {
        message.success("添加成功");
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },
    * edit({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: GoodsApi.category.edit, params });
      if (e.code === 0) {
        message.success("修改成功");
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },
    * del({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: GoodsApi.category.del, params });
      if (e.code === 0) {
        message.success("已删除");
        yield call(getList);
      } else {
        message.warning(e.msg);
      }
    },
    * sort({ params, func }) {
      const e = yield call(Fetch.fetch, { api: GoodsApi.category.sort, params });
      if (e.code === 0) {
        message.success("排序成功");
        yield call(func);
        yield call(getList);
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
