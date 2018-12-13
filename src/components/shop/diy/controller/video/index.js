import React, { Component } from "react";
import { View } from "react-web-dom";
import { Row, Col, Input } from "antd";
import styles from "../separator/index.css";
//
// type Props = {
//     componentName: string,
//     getValues: Function,
//     options: {},
//     data: { url: string }
// }
// type State = {}

export default class Index extends Component {

    static defaultProps = {
        componentName: 'video'
    }

    render() {
        const { options, data, getValues } = this.props
        const { url } = data
        return (
            <View className={`${styles.dataCtrlWarp} dataCtrlWarp`}>
                <Row>
                    <Col span={5}>视频地址：</Col>
                    <Col span={19}>
                        <Input
                            value={url}
                            onChange={(e) => {
                                getValues({
                                    options,
                                    data: { ...data, ...{ url: e.target.value } }
                                })
                            }}
                        />
                    </Col>
                </Row>
                {/*<Row>*/}
                    {/*<Col span={5} />*/}
                    {/*<Col span={19}>*/}
                        {/*<p>目前只支持腾讯视频，请填写完整的带有vid或者sid的视频地址，如：http://v.qq.com/xxx.html?vid=xxxx，默认用我们的广告视频</p>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
            </View>
        )
    }
}
