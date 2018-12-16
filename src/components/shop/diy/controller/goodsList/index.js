import React, { Component } from "react";
import { View } from "react-web-dom";
import { Row, Col, Select, Radio, Checkbox } from "antd";
import styles from "./index.css";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
//
// type Props = {
//     componentName?: string,
//     getValues: Function,
//     refreshGoods: Function,
//     options: {
//         goods_sort: number,
//         goods_display_num: number,
//         goods_display_field: Array<string>,
//         layout_style: number,
//     },
//     data: Array<{
//         id: number,
//         img: {
//             url: string
//         },
//         title: string,
//         price: number,
//         market_price: number,
//         desc: string
//     }>
// }

export default class Index extends Component {

    static defalutProps = {
        componentName: 'goodsList'
    }

    formatGoodsList(goodsListData) {
        return Array.isArray(goodsListData) && goodsListData.length > 0 ? goodsListData.list.map((goods) => {
            return {
                id: goods.id,
                img: goods.img,
                title: goods.title,
                price: goods.price,
                market_price: goods.market_price ? goods.market_price : '',
                desc: goods.desc ? goods.desc : ''
            }
        }) : []
    }

    render() {
        const { options, data, getValues } = this.props
        const { layout_style, goods_display_field, goods_display_num, goods_sort } = options
        return (
            <View className={`${styles.goodsListCtrlWarp} goodsListCtrlWarp`}>
                <Row>
                    <Col span={5}>商品排序：</Col>
                    <Col span={19}>
                        <Select
                            value={goods_sort}
                            style={{ width: 220 }}
                            onChange={async (value) => {
                                const values = {
                                    options: { ...options, ...{ goods_sort: value } },
                                    data
                                }
                                getValues({
                                    options: values.options,
                                    data: await this.props.refreshGoods(values)
                                })

                            }}
                        >
                            <Option value={1}>最新商品（上架从晚到早）</Option>
                            <Option value={2}>最热商品（销量从高到低）</Option>
                            {/*<Option value={3}>商品排序（序号有大到小）</Option>*/}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>显示数量：</Col>
                    <Col span={19}>
                        <RadioGroup
                            value={goods_display_num}
                            onChange={async (e) => {
                                const values = {
                                    options: { ...options, ...{ goods_display_num: e.target.value } },
                                    data
                                }
                                getValues({
                                    options: values.options,
                                    data: await this.props.refreshGoods(values)
                                })
                            }}
                        >
                            <Radio value={6}>前6个商品</Radio>
                            <Radio value={12}>前12个商品</Radio>
                            <Radio value={18}>前18个商品</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>展示形式：</Col>
                    <Col span={19}>
                        <RadioGroup
                            value={layout_style}
                            onChange={async (e) => {
                                getValues({
                                    options: { ...options, ...{ layout_style: e.target.value } },
                                    data
                                })
                            }}
                        >
                            <Radio value={1}>小图</Radio>
                            <Radio value={2}>大图</Radio>
                            <Radio value={3}>一大两小</Radio>
                            <Radio value={4}>列表</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>显示内容：</Col>
                    <Col span={19}>
                        <CheckboxGroup
                            value={goods_display_field}
                            onChange={(checkedValues) => {
                                getValues({
                                    options: { ...options, ...{ goods_display_field: checkedValues } },
                                    data
                                })
                            }}
                        >
                            <Row>
                                <Col span={24}>
                                    <Checkbox value="title">商品名称</Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox value="price">商品销售价</Checkbox>
                                </Col>
                                {/*<Col span={24}>*/}
                                {/*<Checkbox value="market_price">商品原价</Checkbox>*/}
                                {/*</Col>*/}
                            </Row>
                        </CheckboxGroup>
                    </Col>
                </Row>
            </View>
        )
    }
}
