import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Radio } from "antd";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import GroupCard from "@/pages/shop/page/components/diy/controller/common/groupCard/imageGallery";

const GroupCardMake = GroupCard.Make;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
export default class ImageGallery extends Component {
    static defalutProps = {
        componentName: "imageAds",
        options: {
            layout_style: 2
        },
        data: [
            {
                title: "",
                img: {
                    url: ""
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
                        <Radio value={2}>上下平铺</Radio>
                        <Radio value={1}>折叠轮播</Radio>
                    </RadioGroup>
                </FormItem>
                <GroupCardMake
                    defaultValue={{
                        img: {
                            url: require("@/assets/images/page/view/image-ads-default.png")
                        },
                        title: ""
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
