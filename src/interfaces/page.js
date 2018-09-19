//@flow
import { historyType } from "./redux";

export type optionsType = {
    type: string,
    index: number
}

export type OptionsType =
    TopOptionsType
    | GoodsOptionsType
    | GoodsListOptionsType
    | GoodsSearchOptionsType
    | SeparatorOptionsType
    | AuxiliaryBlankOptionsType
    | ImageAdsOptionsType
    | ImageNavOptionsType
    | ShopWindowOptionsType
    | VideoOptionsType
    | TopMenuOptionsType
    | TitleOptionsType
    | TextNavOptionsType

export type DataType =
    GoodsDataType
    | GoodsListDataType
    | ImageAdsDataType
    | ImageNavDataType
    | ShopWindowDataType
    | TopMenuDataType
    | TextNavDataType
    | VideoDataType
export type PageBodyType =
    Array<{
        type: 'top' | 'goods' | 'goods_list' | 'goods_search' | 'separator' | 'auxiliary_blank' | 'image_ads' | 'image_nav' | 'shop_window' | 'video' | 'top_menu' | 'title' | 'text_nav',
        title: string,
        options: any,
        data: any
    }>


export type Page = {
    editShopPage: Function,
    getShopPageInfo: Function,
    history: historyType,
    location: {
        search: {},
        state: {
            record: {
                background_color: string
            }
        }
    },
    options: {
        type: string,
        index: number
    },
    setDiyData: Function,
    getGoodsList: Function,

}

// 店铺装修配置
export type TopOptionsType = {
    name: string,
    description: string,
    background_color: string
}
export type GoodsOptionsType = {
    layout_direction: number
}

export type GoodsListOptionsType = {
    goods_sort: number,
    goods_display_num: number,
    goods_display_field: Array<string>,
    layout_style: number,
}

export type GoodsSearchOptionsType = {
    background_color: string
}

export type SeparatorOptionsType = {
    color: string,
    style: string
}
export type AuxiliaryBlankOptionsType = {
    height: string
}

export type ImageAdsOptionsType = {
    layout_style: number
}
export type ImageNavOptionsType = {
    rows: number,
    each_row_display: number,
}

export type ShopWindowOptionsType = {
    layout_style: number
}
export type VideoOptionsType = any
export type TopMenuOptionsType = {
    menu_format: number,
    menu_space: number
}
export type TitleOptionsType = {
    title: string,
    align: string,
    background_color: string,
    font_color: string,
    leading_image: {
        url: string
    }
}

export type TextNavOptionsType = any


// 店铺装修组件数据
export type GoodsDataType = Array<{
    id: number,
    img: {
        url: string
    },
    title: string,
    price: number,
    market_price: number,
    desc: string
}>
export type GoodsListDataType = Array<{
    id: number,
    img: {
        url: string
    },
    title: string,
    price: number,
    market_price: number,
    desc: string
}>
export type VideoDataType = {
    url: string
}
export type ImageAdsDataType = Array<{
    img: {
        url: string
    },
    title: string,
    link: {
        action: LinkActionType,
        param: {}
    }
}>
export type ImageNavDataType = Array<{
    img: {
        url: string
    },
    title: string,
    link: {
        action: LinkActionType,
        param: {}
    }
}>
export type ShopWindowDataType = Array<{
    img: {
        url: string
    },
    title: string,
    link: {
        action: LinkActionType,
        param: {}
    }
}>
export type TopMenuDataType = Array<{
    title: string,
    link: {
        action: LinkActionType,
        param: {}
    },
    background_color: string,
    font_color: string
}>
export type TextNavDataType = Array<{
    title: string,
    link: {
        action: LinkActionType,
        param: {}
    }
}>
