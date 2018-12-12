import { Fetch } from "../utils/index";
import { AreaApi } from "../config/api/area"
export default {
  namespace: "area",

  state: {
    list: [],
    keyList:[],

  },

  effects: {
*list({ payload }, { call, put }) {
    return Fetch.fetch({ api: AreaApi.list, params })
}

*cascader({ payload }, { call, put }) {
    const e = await list({ params: { level: 2, tree: 1 } })
    if (e.code === 0) {
        const { list } = e.result
        return list.map((item) => {
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
                            }
                        }) : []
                    }
                }) : []
            }
        })
    } else {
        return []
    }
}

*keyList({ payload }, { call, put }) {
    const e = await list({ params: { level: 2 } })
    if (e.code === 0) {
        const { list } = e.result
        let _list = []
        for (let i = 0; i < list.length; i++) {
            _list[list[i]['id']] = {
                name: list[i].name
            }
        }
        return _list
    } else {
        return []
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
