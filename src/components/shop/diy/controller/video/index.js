import React, { Component } from "react";
import { View } from "react-web-dom";
import { Input, Form } from "antd";
import { formItemLayout } from "@/components/shop/diy/formLayout";

const FormItem = Form.Item;

//
// type Props = {
//     componentName: string,
//     getValues: Function,
//     options: {},
//     data: { url: string }
// }
// type State = {}
/*<p>目前只支持腾讯视频，请填写完整的带有vid或者sid的视频地址，如：http://v.qq.com/xxx.html?vid=xxxx，默认用我们的广告视频</p>*/

export default class Index extends Component {

    static defaultProps = {
        componentName: "video"
    };

    render() {
        const { options, data, getValues } = this.props;
        const { url } = data;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="视频地址"
                >
                    <Input
                        value={url}
                        onChange={(e) => {
                            getValues({
                                options,
                                data: { ...data, ...{ url: e.target.value } }
                            });
                        }}
                    />
                </FormItem>
            </Form>
        );
    }
}
