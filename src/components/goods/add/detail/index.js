import React, { Component } from "react";
import { View } from "@/components/flexView";
import styles from "./index.css";
import { Form, Input, InputNumber } from "antd";
import GoodsSpec from "./spec";

const FormItem = Form.Item;
// type SkusType = Array<{
//     price: number | null,
//     stock: number | null,
//     code: string | null,
//     weight: ? number | null,
//     spec: Array<{
//         id: number,
//         name: string | null,
//         value_id: number,
//         value_name: string | null
//     }>
// }>

export default class Detail extends Component {
    static defaultProps = {
        onChange: () => {
        }
    };

    render() {
        const { getFieldDecorator, formItemLayout, specList, setSkus, skus, multiSpec, onMultiSpecChange } = this.props;
        return (
            <View className={`${styles.goodsItem}  specialExplainWarp`}>
                <h3>型号价格</h3>
                <FormItem
                    {...formItemLayout}
                >
                    {getFieldDecorator("skus", {
                        rules: [{
                            validator: this.validator,
                            required: true
                        }],
                        initialValue: skus.length > 0 ? skus : [
                            {
                                spec: [
                                    {
                                        id: 0,
                                        name: null,
                                        value_id: 0,
                                        value_name: null,
                                        value_img: null
                                    }
                                ],
                                price: null,
                                stock: null,
                                code: null,
                                weight: null
                            }
                        ]
                    })(
                        <GoodsSpecForm
                            skus={skus}
                            specList={specList}
                            formItemLayout={formItemLayout}
                            setSkus={setSkus}
                            multiSpec={multiSpec}
                            onMultiSpecChange={(e) => {
                                onMultiSpecChange(e);
                            }}
                        />
                    )}
                </FormItem>
            </View>
        );
    }

    validator = (rule, skus, callback) => {
        // 单产品验证
        if (Array.isArray(skus) && skus.length === 1 && skus[0]["spec"] !== "undefined" && skus[0].spec.length === 1 && skus[0].spec[0].id === 0) {
            if (!skus[0].price) {
                callback("请输入商品价格");
            } else if (!skus[0].stock) {
                callback("请输入商品库存");
            } else {
                callback();
            }
        } else {
            // 多产品验证
            if (Array.isArray(skus)) {
                const index = skus.findIndex((e) => {
                    return !e.price || !e.stock;
                });
                if (index === -1) {
                    callback();
                } else {
                    callback("请完善商品型号价格信息");
                }
            } else {
                callback("请完善商品型号价格信息");
            }

        }
    };
}
// type GoodsSpecFormProps = {
//     skus: SkusType,
//     onChange: ? Function,
//     formItemLayout: {},
//     specList: Array<{
//         id: number,
//         name: string,
//         values: Array<{
//             id: number,
//             name: string,
//         }>
//     }>,
//     setSkus: Function,
//     multiSpec: boolean,
//     onChange:Function,
//     onMultiSpecChange: Function
// }
// type GoodsSpecFormState = {}

class GoodsSpecForm extends Component {
    static defaultProps = {
        skus: [
            {
                spec: [
                    {
                        id: 0,
                        value_id: 0,
                        name: null,
                        value_name: null,
                        value_img: null
                    }
                ],
                price: null,
                stock: null,
                code: null,
                weight: 0
            }
        ],
        onChange: (e) => {
        }
    };
    state = {
        showSku: false
    };
    setSkus = (skus) => {
        this.props.setSkus(skus);
        this.props.onChange(skus);
    };

    render() {
        const { formItemLayout, specList, skus, multiSpec, onMultiSpecChange } = this.props;
        return (
            <div>
                {multiSpec !== true ? <div>
                    <FormItem
                        {...formItemLayout}
                        label='商品价格'
                        required={true}
                    >
                        <InputNumber
                            style={{
                                width: 150
                            }}
                            precision={2}
                            formatter={value => `${value}`}
                            min={0}
                            value={skus[0].price}
                            onChange={(e) => {
                                this.setSkus([{
                                    ...skus[0],
                                    price: e
                                }]);
                            }}
                        /> 元
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='库存'
                        required={true}
                    >
                        <InputNumber
                            style={{ width: 150 }}
                            precision={0}
                            formatter={value => `${value}`}
                            min={0}
                            value={skus[0].stock}
                            onChange={(e) => {
                                this.setSkus([{
                                    ...skus[0],
                                    stock: e
                                }]);
                            }}
                        /> 件
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='商品编码'
                    >
                        <Input
                            style={{ width: 440 }}
                            placeholder="选填，用于商家系统对接"
                            value={skus[0].code}
                            onChange={(e) => {
                                this.setSkus([{
                                    ...skus[0],
                                    code: e.target.value
                                }]);
                            }}
                        />
                    </FormItem>
                </div> : null}
                <FormItem
                    {...formItemLayout}
                    label='商品型号'
                >
                    <GoodsSpec
                        skus={skus}
                        specList={specList}
                        onChange={(skus) => {
                            this.setSkus(skus);
                        }}
                        reset={() => {
                            this.setSkus([]);
                        }}
                        onMultiSpecChange={(e) => {
                            onMultiSpecChange(e);
                        }}
                    />
                </FormItem>
            </div>
        );
    }
}
