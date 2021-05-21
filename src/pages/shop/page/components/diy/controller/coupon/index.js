import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Radio,  InputNumber } from "antd";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import GroupCard from "@/pages/shop/page/components/diy/controller/common/groupCard/index";

const CouponMake = GroupCard.CouponMake;
const FormItem = Form.Item;

const RadioGroup = Radio.Group;

export default class Index extends Component {
    static defaultProps = {
        componentName: "coupon",
        refreshCoupon: () => {
        }
    };

    render() {
        const { options, data, getValues } = this.props;
        const { source_type, display_num } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="数据来源"
                >
                    <RadioGroup
                        value={source_type}
                        onChange={async (e) => {
                            if(e.target.value === 'auto'){
                                const couponList = await this.props.refreshCoupon({
                                    options: { ...options },
                                    data
                                });
                                getValues({
                                    options: { ...options, ...{ source_type: e.target.value } },
                                    data: couponList
                                });
                            }else{
                                getValues({
                                    options: { ...options, ...{ source_type: e.target.value } },
                                    data: []
                                });
                            }
                        }}
                    >
                        <Radio value={"choose"}>选择</Radio>
                        <Radio value={"auto"}>全部</Radio>
                    </RadioGroup>
                </FormItem>
                {
                    source_type === "auto" ?
                        <FormItem
                            {...formItemLayout}
                            label="显示数量"
                            extra="最多12件，最少1件"
                        >
                            <InputNumber
                                max={12}
                                min={1}
                                value={display_num}
                                onChange={async (e) => {
                                    const values = {
                                        options: { ...options, ...{ display_num: e } },
                                        data
                                    };
                                    const  couponList = await this.props.refreshCoupon(values);
                                    getValues({
                                        options: values.options,
                                        data: couponList
                                    });
                                }}
                            />
                            <span> 件</span>
                        </FormItem> : null
                }
                {source_type === "choose" ? <CouponMake
                    dataSource={data ? data : []}
                    onChange={(data) => {
                        getValues({
                            options,
                            data
                        });
                    }}
                /> : null}
            </Form>
        );
    }
}
