import React, { Component } from "react";
import { Icon, Input, Radio, Form } from "antd";
import ColorPicker from "@/components/public/colorPicker";
import { View } from "react-web-dom";
import UploadImage from "@/components/uploadImage";
import { formItemLayout } from "@/components/shop/diy/formLayout";

const FormItem = Form.Item;

const RadioGroup = Radio.Group;
//
// type Props = {
//     componentName: string,
//     getValues: Function,
//     options: {
//         title: string,
//         align: string,
//         background_color: string,
//         font_color: string,
//         leading_image: {
//             url: string
//         }
//     },
//     data: {}
// }
// type State = {}

export default class Index extends Component {
    static defaultProps = {
        componentName: "title"
    };

    render() {
        const { options, data, getValues } = this.props;
        const { title, align, background_color, font_color, leading_image } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="标题名称"
                >
                    <Input
                        style={{ width: 240 }}
                        value={title}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ title: e.target.value } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="对齐方式"
                >
                    <RadioGroup
                        value={align}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ align: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={"left"}>左对齐</Radio>
                        <Radio value={"center"}>居中对齐</Radio>
                        <Radio value={"right"}>右对齐</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="背景颜色"
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
                    label="文字颜色"
                >
                    <ColorPicker
                        color={font_color}
                        colorChange={(color) => {
                            getValues({
                                options: { ...options, ...{ font_color: color.hex } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="前导图片"
                >
                    <UploadImage
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ leading_image: { url: e } } },
                                data
                            });
                        }}
                        is_save={1}
                    >
                        {
                            leading_image.url.length ?
                                <img
                                    src={leading_image.url}
                                    alt=''
                                    style={{ width: "30px" }}
                                /> :
                                <View className={styles.uploadBtn}>
                                    <Icon type='plus' />
                                    <p>上传图标</p>
                                </View>
                        }
                    </UploadImage>
                </FormItem>
            </Form>
        );
    }
}
