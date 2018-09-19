const getGoodsSpecString = (goods_spec, ds = '：') => {
    return goods_spec.map(function (item) {
        return `${item.name}${ds}${item.value_name}，`
    })
}

export {
    getGoodsSpecString,
}
