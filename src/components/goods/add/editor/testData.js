export const abledata = [
    {
        type:'text',
        title: '文字',
        icon: require('../../../../images/shop/title.png'),
        getValue: (e)=>{
            return {
                content: e
            }
        }
    }, {
        type:'image',
        title: '图片',
        icon: require('../../../../images/shop/image_ads.png'),
        getValue: (e)=>{
            return {
                url: e
            }
        }
    },
    // {
    //     type:'video',
    //     title : '视频',
    //     icon : require('../../../../images/shop/video.png'),
    //     getValue: ({img,url})=>{
    //         return {
    //             url,
    //             img,
    //         }
    //     }
    // },
    // {
    //     type:'goods',
    //     title : '商品',
    //     icon : require('../../../../images/shop/goods_list.png'),
    //     getValue: ({id,img,title,price})=>{
    //         return {
    //             id,
    //             img: {
    //                 url: img
    //             },
    //             title,
    //             price,
    //         }
    //     }
    // } ,
    {
        type:'separator',
        title : '分割线',
        icon : require('../../../../images/shop/separator.png'),
    }
]
