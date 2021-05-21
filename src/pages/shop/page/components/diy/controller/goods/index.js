import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Radio } from "antd";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import GroupCard from "@/pages/shop/page/components/diy/controller/common/groupCard/index";

const FormItem = Form.Item;

const RadioGroup = Radio.Group;

export default class Index extends Component {

    render() {
        const { options, data, getValues } = this.props;
        const { layout_style, goods_title_rows } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="展现形式"
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
                        <Radio value={2}>大图</Radio>
                        <Radio value={4}>列表</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标题行数"
                    style={{display:'none'}}
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
                <GroupCard.GoodsMake
                    dataSource={data}
                    onChange={(data) => {
                        getValues({
                            options,
                            data
                        });
                    }}
                />
            </Form>
        );
    }
}
