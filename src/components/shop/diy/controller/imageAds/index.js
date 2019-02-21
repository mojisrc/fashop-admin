import React, { Component } from "react";
import { Radio,  Form } from "antd";
import { formItemLayout } from "@/components/shop/diy/formLayout";
import GroupCard from "@/components/shop/diy/controller/common/groupCard";

const GroupCardMake = GroupCard.Make;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
// type LinkActionType = 'portal' | 'goods' | 'page' | 'url'
export default class Index extends Component {
    static defalutProps = {
        componentName: "imageAds",
        options: {
            layout_style: 1
        },
        data: [
            {
                title: "首页",
                img: {
                    url: ""
                },
                link: {
                    action: "portal",
                    param: {
                        id: ""
                    }
                }
            }
        ],
        getValues: () => {
        }
    };

    render() {
        let { options, data, getValues } = this.props;
        const { layout_style } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="显示形式"
                    help="建议图片最大宽度不超过640px"
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
                        <Radio value={1}>折叠轮播</Radio>
                        <Radio value={2}>上下平铺</Radio>
                    </RadioGroup>
                </FormItem>
                <GroupCardMake
                    defaultValue={{
                        img: {
                            url: require("@/assets/images/page/view/image-ads-default.png")
                        },
                        title: "",
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
                />
            </Form>
        );
    }
}
