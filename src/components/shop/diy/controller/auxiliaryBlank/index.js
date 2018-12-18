import React, { Component } from "react";
import { Slider, Form } from "antd";
import { formItemLayout } from "@/components/shop/diy/formLayout";
const FormItem = Form.Item
// type Props = {
//     componentName?:string,
//     getValues: Function,
//     options: {
//         height: number
//     },
//     data: {}
// }
// type State = {}

export default class Index extends Component {
    static defaultProps = {
        componentName: "auxiliaryBlank"
    };

    render() {
        const { options, data, getValues } = this.props;
        const { height } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="高度"
                >
                    <Slider
                        value={height}
                        onChange={(height) => {
                            getValues({
                                options: {
                                    height
                                },
                                data
                            });
                        }}
                    />
                    <span>{height}</span>
                </FormItem>
            </Form>
        );
    }
}
