import types from '../../constants';


export const getGoodsCategoryList = () => {
    return dispatch => {
        dispatch({
            type: types.goods.GET_GOODS_CATEGORY_LIST,
        })
    }
}

const toCategoryTree = (list) => {
    const newArray = []
    list.map((e) => {
        e.children = e._child
        delete e._child
        newArray.push(e)
        if (e.children.length) {
            return toCategoryTree(e.children)
        }
    })
    return newArray
}
// new array 这些需要重构名字 太懵逼了
const toCategoryList = (list) => {
    let newArray = []
    const newArray2 = []
    list.map((e) => {
        newArray.push(e)
        if (e.children && e.children.length) {
            e.children.map((a) => {
                newArray.push(a)
            })
        }
    })
    newArray.map((e) => {
        if (e.children) {
            delete e.children
        }
        newArray2.push(e)
    })
    return newArray2
}

export const setGoodsCategoryList = ({ list }) => {
    return dispatch => {
        const categoryTree = JSON.parse(JSON.stringify(list))
        toCategoryTree(categoryTree)
        const categoryList = toCategoryList(JSON.parse(JSON.stringify(categoryTree)))
        dispatch({
            type: types.goods.SET_GOODS_CATEGORY_LIST,
            categoryTree,
            categoryList,
        })
    }
}


export const addCategory = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.goods.ADD_GOODS_CATEGORY,
            params,
        })
    }
}


export const editCategory = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.goods.EDIT_GOODS_CATEGORY,
            params,
        })
    }
}


export const delCategory = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.goods.DEL_GOODS_CATEGORY,
            params,
        })
    }
}


export const sortCategory = ({ params, func }) => {
    return dispatch => {
        dispatch({
            type: types.goods.SORT_GOODS_CATEGORY,
            params,
            func,
        })
    }
}
