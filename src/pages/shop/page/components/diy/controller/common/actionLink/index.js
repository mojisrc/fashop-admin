import React, { Component } from "react";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { Popover, Tag } from "antd";
import SelectGoods from "@/pages/shop/page/components/selectGoods";
import SelectPage from "@/pages/shop/page/components/selectPage";
import SelectCategoryPage from "@/pages/shop/page/components/selectCategoryPage";
import SelectGoodsCategory from "@/pages/shop/page/components/selectGoodsCategory";
import SelectBrand from "@/pages/shop/page/components/selectBrand";
import InputUrl from "@/components/public/inputUrl";
// export type LinkActionType = 'portal' | 'goods' | 'page' | 'url' | 'goods_category'

// todo onChange() :xxx 约束
export const linkInfo = {
    portal: {
        type: "portal",
        name: "首页链接",
        alias: "首页"
    },
    goods: {
        type: "goods",
        name: "商品链接",
        alias: "商品"
    },
    page: {
        type: "page",
        name: "自定义专题页面",
        alias: "自定义专题页面"
    },
    category_page: {
        type: "category_page",
        name: "自定义分类页面",
        alias: "自定义分类页面"
    },
    url: {
        type: "url",
        name: "自定义链接",
        alias: "链接地址"
    },
    goods_category: {
        type: "goods_category",
        name: "商品分类链接",
        alias: "商品分类"
    },
    brand: {
        type: "brand",
        name: "品牌详情",
        alias: "品牌详情"
    },
    do_not_jump:{
        type: "do_not_jump",
        name: "不跳转",
        alias: "不跳转"
    }
};

export default class ActionLink extends Component {
    state = {
        urlValue: {
            url: ""
        },
    };
    onClick = (linkAction) => {
        const props = { ...this.props };
        switch (linkAction) {
            case "portal":
                props.onChange({
                    action: "portal",
                    param: {}
                });
                break;
            case "goods":
                this.selectGoods.show();
                break;
            case "page":
                this.selectPage.show();
                break;
            case "category_page":
                this.selectCategoryPage.show();
                break;
            case "goods_category":
                this.selectGoodsCategory.show();
                break;
            case "url":
                this.inputUrl.show();
                break;
            case "member_card_list":
                props.onChange({
                    action: "member_card_list",
                    param: {}
                });
                break;
            case "brand":
                this.selectBrand.show();
                break;
            case "do_not_jump":
                props.onChange({
                    action: "do_not_jump",
                    param: {}
                });
                break;
        }
    };

    render() {
        const props = { ...this.props };
        const { type, onChange } = props;
        let a = []
        Object.keys(linkInfo).forEach((key)=>{
            a.push(<a key={key} onClick={() => {
                this.onClick(linkInfo[key].type);
            }}>{linkInfo[key].name}</a>)
        })
        return (
            <View>
                <div>
                    <Popover
                        placement="bottom"
                        content={
                            <View className={`${styles.actionLinkPopoverContent}`}>
                                {a.map((item)=>item)}
                            </View>
                        }
                    >
                        <Tag color="#108ee9">{linkInfo[type].alias}</Tag>
                        <a type="primary">修改</a>
                    </Popover>
                </div>
                <SelectGoods
                    multiSelect={false}
                    ref={(e) => this.selectGoods = e}
                    onOk={(state) => {
                        this.selectGoods.close();
                        onChange({
                            action: "goods",
                            param: {
                                id: state.checkedData[0].id
                            }
                        });
                    }}
                />
                <SelectPage
                    ref={(e) => this.selectPage = e}
                    getState={(state) => {
                        this.selectPage.close();
                        onChange({
                            action: "page",
                            param: {
                                id: state.value.id
                            }
                        });
                    }}
                />
                <SelectCategoryPage
                    ref={(e) => this.selectCategoryPage = e}
                    getState={(state) => {
                        this.selectCategoryPage.close();
                        onChange({
                            action: "category_page",
                            param: {
                                id: state.value.id
                            }
                        });
                    }}
                />
                <SelectGoodsCategory
                    ref={(e) => this.selectGoodsCategory = e}
                    getState={(state) => {
                        this.selectGoodsCategory.close();
                        onChange({
                            action: "goods_category",
                            param: {
                                id: state.value.id
                            }
                        });
                    }}
                />
                <SelectBrand
                    ref={(e) => this.selectBrand = e}
                    getState={(state) => {
                        this.selectBrand.close();
                        onChange({
                            action: "brand",
                            param: {
                                id: state.value.id
                            }
                        });
                    }}
                />
                <InputUrl
                    ref={(e) => this.inputUrl = e}
                    getState={(state) => {
                        this.inputUrl.close();
                        onChange({
                            action: "url",
                            param: state.urlValue
                        });
                    }}
                />
            </View>
        );
    }
}
