import React, { Component } from "react";
import { Input, Form, Card } from "antd";
import ColorPicker from "@/components/public/colorPicker";
import { formItemLayout } from "@/components/shop/diy/formLayout";

const { TextArea } = Input;
const FormItem = Form.Item;
// type Props = {
//     name: string,
//     description: string,
//     backgroundColor: string,
//     getValues: Function
// }
// type State = {
// }

export default class Index extends Component {

    render() {
        const { name, description, backgroundColor, getValues } = this.props;
        return (
            <Card bordered={false}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="页面名称"
                        help="页面名称便于后台查找"
                    >
                        <Input
                            placeholder='请输入'
                            value={name}
                            onChange={(e) => {
                                getValues({
                                    name: e.target.value,
                                    description,
                                    backgroundColor
                                });
                            }}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="页面描述"
                        help="用户通过微信分享给朋友时显示的描述内容"
                    >
                                    <TextArea
                                        placeholder='请输入'
                                        autosize={{ minRows: 5, maxRows: 8 }}
                                        value={description}
                                        onChange={(e) => {
                                            getValues({
                                                description: e.target.value,
                                                name,
                                                backgroundColor
                                            });
                                        }}
                                    />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="背景颜色"
                    >
                        <ColorPicker
                            color={backgroundColor}
                            colorChange={(color) => {
                                getValues({
                                    backgroundColor: color.hex,
                                    name,
                                    description
                                });
                            }}
                        />
                    </FormItem>
                </Form>
            </Card>
        );
    }
}
