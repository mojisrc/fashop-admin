import React, { Component } from "react";
import { Radio, Form } from "antd";
import ColorPicker from "@/components/public/colorPicker";
import { formItemLayout } from "@/components/shop/diy/formLayout";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
//
// type Props = {
//     componentName?: string,
//     getValues: Function,
//     options: {
//         color: string,
//         style: string
//     },
//     data: {}
// }
// type State = {}

export default class Index extends Component {

    static defalutProps = {
        componentName: "separator"
    };

    render() {
        const { options, data, getValues } = this.props;
        const { color, style } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="颜色"
                >
                    <ColorPicker
                        color={color}
                        colorChange={(color) => {
                            getValues({
                                options: { ...options, ...{ color: color.hex } },
                                data
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="样式"
                >
                    <RadioGroup
                        value={style}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ style: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={"dashed"}>虚线</Radio>
                        <Radio value={"solid"}>实线</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        );
    }
}
