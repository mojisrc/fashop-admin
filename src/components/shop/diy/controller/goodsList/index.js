import React, { Component } from "react";
import { Select, Radio, Checkbox, Form } from "antd";
import { formItemLayout } from "@/components/shop/diy/formLayout";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

export default class Index extends Component {

    static defalutProps = {
        componentName: "goodsList"
    };

    render() {
        const { options, data, getValues } = this.props;
        const { layout_style, goods_display_field, goods_display_num, goods_sort,goods_title_rows } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="商品排序"
                >
                    <Select
                        value={goods_sort}
                        style={{ width: 220 }}
                        onChange={async (value) => {
                            const values = {
                                options: { ...options, ...{ goods_sort: value } },
                                data
                            };
                            getValues({
                                options: values.options,
                                data: await this.props.refreshGoods(values)
                            });

                        }}
                    >
                        <Option value={1}>最新商品（上架从晚到早）</Option>
                        <Option value={2}>最热商品（销量从高到低）</Option>
                        {/*<Option value={3}>商品排序（序号有大到小）</Option>*/}
                    </Select>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="显示数量"
                >
                    <RadioGroup
                        value={goods_display_num}
                        onChange={async (e) => {
                            const values = {
                                options: { ...options, ...{ goods_display_num: e.target.value } },
                                data
                            };
                            getValues({
                                options: values.options,
                                data: await this.props.refreshGoods(values)
                            });
                        }}
                    >
                        <Radio value={6}>前6个商品</Radio>
                        <Radio value={12}>前12个商品</Radio>
                        <Radio value={18}>前18个商品</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="展示形式"
                >
                    <RadioGroup
                        value={layout_style}
                        onChange={async (e) => {
                            getValues({
                                options: { ...options, ...{ layout_style: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>小图</Radio>
                        <Radio value={2}>大图</Radio>
                        <Radio value={3}>一大两小</Radio>
                        <Radio value={4}>列表</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="显示内容"
                >
                    <CheckboxGroup
                        value={goods_display_field}
                        onChange={(checkedValues) => {
                            getValues({
                                options: { ...options, ...{ goods_display_field: checkedValues } },
                                data
                            });
                        }}
                    >
                        <Checkbox value="title">商品名称</Checkbox>
                        <Checkbox value="price">商品销售价</Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标题行数"
                >
                    <RadioGroup
                        value={goods_title_rows}
                        onChange={async (e) => {
                            getValues({
                                options: { ...options, ...{ goods_title_rows: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>一行</Radio>
                        <Radio value={2}>两行</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        );
    }
}
