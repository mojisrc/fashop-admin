import types from '../../constants';
import { message } from "antd";
import { Fetch, fetchStatus } from '../../utils';

export const getAllSpecCategory = ()=>{
    return dispatch => {
        dispatch({
            type : types.goods.GET_ALL_SPEC,
            specList:[
                {
                    id:1,
                    title:'尺寸',
                    child:[
                        {
                            id:'1-1',
                            title:'M',
                            isSelected:false,
                        },{
                            id:'1-2',
                            title:'L',
                            isSelected:false,
                        },{
                            id:'1-3',
                            title:'S',
                            isSelected:false,
                        },{
                            id:'1-4',
                            title:'XXXXXXL',
                            isSelected:false,
                        }
                    ],
                    isSelected:false,
                },{
                    id:2,
                    title:'颜色',
                    child:[
                        {
                            id:'2-1',
                            title:'红色',
                            isSelected:false,
                        },{
                            id:'2-2',
                            title:'白色',
                            isSelected:false,
                        },{
                            id:'2-3',
                            title:'黑色',
                            isSelected:false,
                        },{
                            id:'2-4',
                            title:'蓝色',
                            isSelected:false,
                        },{
                            id:'2-5',
                            title:'灰色',
                            isSelected:false,
                        }
                    ],
                    isSelected:false,
                },{
                    id:'3',
                    title:'规格',
                    child:[
                        {
                            id:'3-1',
                            title:'2kg',
                            isSelected:false,
                        },{
                            id:'3-2',
                            title:'1kg',
                            isSelected:false,
                        },{
                            id:'3-3',
                            title:'500g',
                            isSelected:false,
                        }
                    ],
                    isSelected:false,
                }
            ],
            specListFetchStatus : fetchStatus.s,
        })
        // dispatch({
        //     type : types.goods.GET_ALL_SPEC,
        //     specListFetchStatus : fetchStatus.l,
        // })
        // Fetch.fetch("ADRECOMMENDLISTS",{category_id:6})
        // .then(
        //     e => {
        //         if(e.errcode===0){
        //             dispatch({
        //                 type : types.goods.GET_ALL_SPEC,
        //                 specList:e.list,
        //                 specListFetchStatus : fetchStatus.s,
        //             })
        //         }else {
        //             message.error(e.errmsg)
        //             dispatch({
        //                 type : types.goods.GET_ALL_SPEC,
        //                 specListFetchStatus : fetchStatus.e,
        //             })
        //         }
        //     },
        //     err => {
        //         dispatch({
        //             type : types.goods.GET_ALL_SPEC,
        //             specListFetchStatus : fetchStatus.f,
        //         })
        //     }
        // )
    }
}

//添加新的型号分类
// todo 这是什么？
export const addSpecCategory = ()=>{
    return dispatch => {
        Fetch.fetch("ADRECOMMENDLISTS",{category_id:6})
        .then(
            e => {
                if(e.errcode===0){
                    dispatch({
                        type : types.goods.ADD_NEW_SPEC,
                        specList:e.list,
                        specListFetchStatus : fetchStatus.s,
                    })
                }else {
                    message.error(e.errmsg)
                }
            }
        )
    }
}

//型号分类展示
export const ifSpecCategoryShowFunc = (ifSpecCategoryShow)=>{
    return dispatch => {
        dispatch({
            type : types.goods.IF_SPEC_SHOW,
            ifSpecCategoryShow,
        })
    }
}

//添加型号分类
export const addSpecCategoryShow = (specShowList,id)=>{
    return dispatch => {
        dispatch(ifSpecCategoryShowFunc(true))
        specShowList.push({
            id,
            child:[]
        })
        dispatch({
            type : types.goods.ADD_SPEC_SHOW,
            specShowList,
        })
    }
}

//删除型号分类
export const delectSpecCategoryShow = (index,specShowList)=>{
    return dispatch => {
        if(specShowList.length>1){
            specShowList.splice(index,1)
            dispatch({
                type : types.goods.DELETE_SPEC_SHOW,
                specShowList : specShowList,
            })
            dispatch(ifSpecCategoryShowFunc(true))
        }else {
            dispatch({
                type : types.goods.DELETE_SPEC_SHOW,
                specShowList : [],
            })
            dispatch(ifSpecCategoryShowFunc(false))
        }
    }
}


// export const addSpec = ()=>{
//     return dispatch => {
//         Fetch.fetch("ADRECOMMENDLISTS",{category_id:6})
//         .then(
//             e => {
//                 if(e.errcode===0){
//                     dispatch({
//                         type : types.goods.ADD_SPEC,
//                         list:e.list,
//                         fetchStatus : fetchStatus.s,
//                     })
//                 }else {
//                     message.error(e.errmsg)
//                     dispatch({
//                         type : types.goods.ADD_SPEC,
//                         fetchStatus : fetchStatus.e,
//                     })
//                 }
//             }
//         )
//     }
// }
//
// export const deleteSpec = ()=>{
//     return dispatch => {
//         Fetch.fetch("ADRECOMMENDLISTS",{category_id:6})
//         .then(
//             e => {
//                 if(e.errcode===0){
//                     dispatch({
//                         type : types.goods.DELETE_SPEC,
//                         list:e.list,
//                         fetchStatus : fetchStatus.s,
//                     })
//                 }else {
//                     message.error(e.errmsg)
//                     dispatch({
//                         type : types.goods.DELETE_SPEC,
//                         fetchStatus : fetchStatus.e,
//                     })
//                 }
//             }
//         )
//     }
// }
//
//
//
// export const specDelectShow = (specShow)=>{
//     return dispatch => {
//         dispatch({
//             type : types.goods.SPEC_DELETE_SHOW,
//             specShow,
//         })
//     }
// }
//
// export const specAddShow = ()=>{
//     return dispatch => {
//         dispatch({
//             type : types.goods.SPEC_ADD_SHOW,
//             list:[],
//         })
//     }
// }
//
// export const specDeleteShow = ()=>{
//     return dispatch => {
//         dispatch({
//             type : types.goods.SPEC_DELETE_SHOW,
//             list:[],
//         })
//     }
// }
