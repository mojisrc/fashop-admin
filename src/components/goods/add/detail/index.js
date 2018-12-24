import React, { Component, Fragment } from "react";
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

export default class Skus extends Component {
    defaultValue = [
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
    ]
    constructor(props) {
        super(props);
        const value = props.value || this.defaultValue;
        this.state = {
            value,
            showSku: false
        };
    }

    setSkus = (value) => {
        this.setState({ value }, () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(value);
            }
        });
    };

    render() {
        const { formItemLayout } = this.props;
        const skus = this.state.value;
        return (
            <Fragment>
                {skus.length === 1 ? <div>
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
                >
                    <GoodsSpec
                        skus={skus}
                        onChange={(skus) => {
                            this.setSkus(skus);
                        }}
                        reset={() => {
                            this.setSkus(this.defaultValue);
                        }}
                        onMultiSpecChange={(e) => {
                            console.log('onMultiSpecChange',e)
                        }}
                    />
                </FormItem>
            </Fragment>
        );
    }

}
