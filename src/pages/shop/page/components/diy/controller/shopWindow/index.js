import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Radio } from "antd";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import GroupCard from "@/pages/shop/page/components/diy/controller/common/groupCard/index";

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
                        <Radio value={1}>一大两小</Radio>
                        <Radio value={2}>3列（废弃）</Radio>
                        <Radio value={112}>2列</Radio>
                        <Radio value={113}>3列</Radio>
                        <Radio value={114}>4列</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="设置图片"
                    help="一大两小模式，左侧大图建议比例284 x 592px，小图300 x 300px"
                >
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
                    addShow={true}
                    sortShow={true}
                />
            </Form>
        );
    }
}
