import React, { Component } from "react";
import { Radio, Form } from "antd";
import { View } from "react-web-dom";
import { formItemLayout } from "@/components/shop/diy/formLayout";
import GroupCard from "@/components/shop/diy/controller/common/groupCard";

const GroupCardMake = GroupCard.Make;
const FormItem = Form.Item;

const RadioGroup = Radio.Group;
// type LinkActionType = 'portal' | 'goods' | 'page' | 'url'
//
// type Props = {
//     componentName: string,
//     getValues: Function,
//     options: {
//         menu_format: number,
//         menu_space: number
//     },
//     data: Array<{
//         img: {
//             url: string
//         },
//         title: string,
//         link: {
//             action: LinkActionType,
//             param: {}
//         },
//         background_color: string,
//         font_color: string
//     }>
// }
// type State = {}

export default class Index extends Component {

    static defaultProps = {
        componentName: "topMenu"
    };

    render() {
        const { options, data, getValues } = this.props;
        const { menu_format, menu_space } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="菜单格式"
                >
                    <RadioGroup
                        value={menu_format}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ menu_format: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>纯文字导航</Radio>
                        <Radio value={2}>小图标导航</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="菜单间距"
                >
                    <RadioGroup
                        value={menu_space}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ menu_space: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>无间距</Radio>
                        <Radio value={2}>有间距</Radio>
                    </RadioGroup>
                </FormItem>
                <GroupCardMake
                    defaultValue={{
                        title: "文字",
                        img: {
                            url: ""
                        },
                        link: {
                            action: "portal",
                            param: {}
                        },
                        background_color: "#FFFFFF",
                        font_color: "#333333"
                    }}
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
