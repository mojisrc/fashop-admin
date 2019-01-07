import React, { Component } from "react";
import { Radio, Form } from "antd";
import { formItemLayout } from "@/components/shop/diy/formLayout";
import GroupCard from "@/components/shop/diy/controller/common/groupCard";

const FormItem = Form.Item;

const RadioGroup = Radio.Group;

export default class Index extends Component {
    static defaultProps = {
        componentName: "goods"
    };

    render() {
        const { options, data, getValues } = this.props;
        const { layout_direction, goods_title_rows } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="展现形式"
                >
                    <RadioGroup
                        value={layout_direction}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ layout_direction: e.target.value } },
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
