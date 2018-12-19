import React, { Component } from "react";
import {  Radio, Form } from "antd";
import { View } from "react-web-dom";
import { formItemLayout } from "@/components/shop/diy/formLayout";
import GroupCard from "@/components/shop/diy/controller/common/groupCard";

const GroupCardMake = GroupCard.Make;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class Index extends Component {
    static defaultProps = {
        componentName: "shopWindow"
    };

    render() {
        const { options, data, getValues } = this.props;
        const { layout_style } = options;
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
                                options: {
                                    ...options,
                                    layout_style: e.target.value
                                },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>2列,一大两小</Radio>
                        <Radio value={2}>3列,三小图</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="设置图片"
                    help="一大两小模式，左侧大图建议比例284 x 592px，小图300 x 300px"
                >
                    <RadioGroup
                        value={layout_style}
                        onChange={(e) => {
                            getValues({
                                options: {
                                    ...options,
                                    layout_style: e.target.value
                                },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>2列,一大两小</Radio>
                        <Radio value={2}>3列,三小图</Radio>
                    </RadioGroup>
                </FormItem>

                <GroupCardMake
                    defaultValue={{
                        img: {
                            url: require("@/assets/images/page/view/image-nav-default.png")
                        },
                        title: "文字",
                        link: {
                            action: "portal",
                            param: {}
                        }
                    }}
                    dataSource={data}
                    onChange={(data) => {
                        getValues({
                            options,
                            data
                        });
                    }}
                    addShow={false}
                    sortShow={false}
                />
            </Form>
        );
    }
}
