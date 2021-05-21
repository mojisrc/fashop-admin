import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Input,  Card } from "antd";
import ColorPicker from "@/components/public/colorPicker";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import ImageSpace from "@/components/uploadImage/imageSpace";

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
        const { name, description, backgroundColor, shareTitle, shareImg, getValues } = this.props;
        let values = {
            name, description, backgroundColor, shareTitle, shareImg
        };
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
                                    ...values,
                                    ...{ name: e.target.value }
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
                                    ...values,
                                    ...{ description: e.target.value }
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
                                    ...values,
                                    ...{ backgroundColor: color.hex }
                                });
                            }}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="分享标题"
                        help="分享时的文案"
                    >
                        <Input
                            placeholder='请输入'
                            value={shareTitle}
                            onChange={(e) => {
                                getValues({
                                    ...values,
                                    ...{ shareTitle: e.target.value }
                                });
                            }}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="分享图片"
                        help="图小于128k,否则安卓模糊"
                    >
                        <ImageSpace
                            multi={false}
                            batch={false}
                            url={shareImg}
                            itemStyle={{
                                width: 100,
                                height: 100
                            }}
                            onChange={(e) => {
                                getValues({
                                    ...values,
                                    ...{ shareImg: e }
                                });
                            }}
                        />
                    </FormItem>
                </Form>
            </Card>
        );
    }
}
