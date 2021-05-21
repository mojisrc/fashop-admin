import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Radio,  InputNumber } from "antd";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import GroupCard from "@/pages/shop/page/components/diy/controller/common/groupCard/index";
import ColorPicker from "@/components/public/colorPicker";
import Arr from "@/utils/array";

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
        const { layout_style, indicator_dots, indicator_color, background_color, indicator_active_color, autoplay, interval, duration, circular, padding_top, padding_bottom, radius, previous_margin } = options || {};
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
                        <Radio value={1}>轮播</Radio>
                        <Radio value={2}>平铺</Radio>
                        <Radio value={3}>卡片</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="背景色"
                    {...{
                        className: !Arr.inArray(layout_style, [3]) ? "ant-form-item-hidden" : ""
                    }}
                >
                    <ColorPicker
                        color={background_color}
                        colorChange={(color) => {
                            getValues({
                                options: { ...options, ...{ background_color: color.hex } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="指示点"
                >
                    <RadioGroup
                        value={indicator_dots}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ indicator_dots: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>显示</Radio>
                        <Radio value={0}>不显示</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="指示点颜色"
                >
                    <ColorPicker
                        color={indicator_color}
                        colorChange={(color) => {
                            getValues({
                                options: { ...options, ...{ indicator_color: color.hex } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="指示点高亮"
                >
                    <ColorPicker
                        color={indicator_active_color}
                        colorChange={(color) => {
                            getValues({
                                options: { ...options, ...{ indicator_active_color: color.hex } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="自动切换"
                >
                    <RadioGroup
                        value={autoplay}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ autoplay: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="切换间隔"
                    extra="单位：毫秒"
                >
                    <InputNumber
                        value={interval}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ interval: e } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="动画时长"
                    extra="单位：毫秒"
                >
                    <InputNumber
                        value={duration}
                        onChange={async (e) => {
                            getValues({
                                options: { ...options, ...{ duration: e } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="衔接滚动"
                >
                    <RadioGroup
                        value={circular}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ circular: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="内边距上"
                    extra="单位：px"
                    {...{
                        className: !Arr.inArray(layout_style, [3]) ? "ant-form-item-hidden" : ""
                    }}
                >
                    <InputNumber
                        value={padding_top}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ padding_top: e } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="内边距下"
                    extra="单位：px"
                    {...{
                        className: !Arr.inArray(layout_style, [3]) ? "ant-form-item-hidden" : ""
                    }}
                >
                    <InputNumber
                        value={padding_bottom}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ padding_bottom: e } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="圆角"
                    extra="单位：px"
                    {...{
                        className: !Arr.inArray(layout_style, [3]) ? "ant-form-item-hidden" : ""
                    }}
                >
                    <InputNumber
                        value={radius}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ radius: e } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="露出前后部分"
                    extra="单位：px"
                    {...{
                        className: !Arr.inArray(layout_style, [3]) ? "ant-form-item-hidden" : ""
                    }}
                >
                    <InputNumber
                        value={previous_margin}
                        onChange={async (e) => {
                            getValues({
                                options: { ...options, ...{ previous_margin: e, next_margin: e } },
                                data
                            });
                        }}
                    />
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
                    allowFields={['img', 'link']}
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
