import React, { Component } from "react";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { Popover, Tag } from "antd";
import SelectPage from "./selectPage/index";
import SelectGoodsCategory from "./selectGoodsCategory/index";
import SelectGoods from "./selectGoods/index";
import SelectBrand from "./selectBrand/index";
import InputUrl from "@/components/public/inputUrl/index";

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
    brand: {
        type: "brand",
        name: "品牌链接",
        alias: "品牌链接"
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
    }
};

export default class ActionLink extends Component {
    state = {
        urlValue: {
            url: ""
        },
        inputUrlVisible: false
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
            case "goods_category":
                this.selectGoodsCategory.show();
                break;
            case "brand":
                this.selectBrand.show();
                break;
            case "url":
                this.inputUrl.show();
                break;
        }
    };
    getAtionLinkPopoverContent = () => {
        let self = this
        let content = [];
        Object.keys(linkInfo).forEach(function(key) {
            content.push(<a key={key} onClick={() => {
                self.onClick(linkInfo[key].type);
            }}>{linkInfo[key].name}</a>);
        });
        return content;
    };

    render() {
        const props = { ...this.props };
        const { type, onChange } = props;
        return (
            <View>
                <View>
                    <Popover
                        placement="bottom"
                        content={
                            <View className={`${styles.actionLinkPopoverContent}`}>
                                {this.getAtionLinkPopoverContent()}
                            </View>
                        }
                    >
                        <Tag color="#108ee9">{linkInfo[type].alias}</Tag>
                        <a type="primary">修改</a>
                    </Popover>
                </View>
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
                <SelectGoodsCategory
                    ref={(e) => this.selectGoodsCategory = e}
                    getState={(state) => {
                        this.selectGoodsCategory.close();
                        onChange({
                            action: "goods_category",
                            param: {
                                id: state.value.id
                            }
                        },{action: "goods_category",value:state.value});
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
