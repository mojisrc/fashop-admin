import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { View } from "@/components/flexView";

import ColorPicker from "@/components/public/colorPicker";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";

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
