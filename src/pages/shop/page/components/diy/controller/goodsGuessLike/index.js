import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Select, Radio,  InputNumber } from "antd";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import GoodsMake from "./sortCard/make";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

export default class GoodsGuessLikeController extends Component {
    static defalutProps = {
        refreshGoods: () => {
        }
    };

    render() {
        const { options, data, getValues } = this.props;
        const { source_type, goods_sort, layout_style, goods_display_num, goods_title_rows } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="添加方式"
                >
                    <RadioGroup
                        value={source_type}
                        onChange={async (e) => {
                            if (e.target.value === "auto") {
                                const goodsList = await this.props.refreshGoods({
                                    options: { ...options },
                                    data
                                });
                                getValues({
                                    options: { ...options, ...{ source_type: e.target.value } },
                                    data: goodsList
                                });
                            } else {
                                getValues({
                                    options: { ...options, ...{ source_type: e.target.value } },
                                    data: []
                                });
                            }
                        }}
                    >
                        <Radio value="auto">自动添加</Radio>
                        {/*<Radio value="choose">手动添加</Radio>*/}
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
                                value={goods_display_num}
                                onChange={async (e) => {
                                    const values = {
                                        options: { ...options, ...{ goods_display_num: e } },
                                        data
                                    };
                                    getValues({
                                        options: values.options,
                                        data: await this.props.refreshGoods(values)
                                    });
                                }}
                            />
                            <span> 件</span>
                        </FormItem> : null
                }
                {
                    source_type === "auto" ?
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
                                <Option value={1}>浏览时间倒序排列</Option>
                            </Select>
                        </FormItem> : null
                }
                {
                    source_type === "choose" ?
                        <GoodsMake
                            dataSource={data}
                            onChange={(data) => {
                                getValues({
                                    options,
                                    data
                                });
                            }}
                        /> : null
                }
                <FormItem
                    {...formItemLayout}
                    label="展示形式"
                >
                    <RadioGroup
                        value={layout_style}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ layout_style: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>小图</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标题行数"
                    style={{display:'none'}}
                >
                    <RadioGroup
                        value={goods_title_rows}
                        onChange={(e) => {
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
