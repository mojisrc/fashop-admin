import { Form } from "@ant-design/compatible";
import React, { Component } from "react";
import { Input } from "antd";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import SelectVideo from "@/pages/goods/components/selectVideo";
import SettingOutlined from "@ant-design/icons/SettingOutlined";

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
                    addonAfter={<SettingOutlined onClick={() => {
                        this.selectVideo.show();
                    }} />}
                  />
                  <SelectVideo
                    ref={(e) => this.selectVideo = e}
                    getState={(state) => {
                        this.selectVideo.close();
                        getValues({
                            options,
                            data: { ...data, ...{ url: state.value.url } }
                        });
                    }}
                  />
              </FormItem>
          </Form>
        );
    }
}
