import React, { Component } from "react";
import { View } from "react-web-dom";
import { Form } from "antd";
import ColorPicker from "@/components/public/colorPicker";
import { formItemLayout } from "@/components/shop/diy/formLayout";

const FormItem = Form.Item;

//
// type Props = {
//     componentName?: 'string',
//     options: {
//         background_color: string
//     },
//     data: {},
//     getValues: Function
// }
// type State = {}
export default class Index extends Component {
    static defalutProps = {
        componentName: "goodsSearch"
    };

    render() {
        const { options, data, getValues } = this.props;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="背景颜色"
                >
                    <ColorPicker
                        color={options.background_color}
                        colorChange={(color) => {
                            getValues({
                                options: { ...options, ...{ background_color: color.hex } },
                                data
                            });
                        }}
                    />
                </FormItem>
            </Form>
        );
    }
}
