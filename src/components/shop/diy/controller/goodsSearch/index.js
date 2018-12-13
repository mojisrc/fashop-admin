import React, { Component } from "react";
import { View } from "react-web-dom";
import { Row, Col } from "antd";
import ColorPicker from "@/public/ColorPicker";
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
        componentName: 'goodsSearch'
    }

    render() {
        const { options, data, getValues } = this.props
        return (
            <View className={`goodsSearchCtrlWarp`}>
                <Row>
                    <Col span={5}>背景颜色：</Col>
                    <Col span={19}>
                        <ColorPicker
                            color={options.background_color}
                            colorChange={(color) => {
                                getValues({
                                    options: { ...options, ...{ background_color: color.hex } },
                                    data
                                })
                            }}
                        />
                    </Col>
                </Row>
            </View>
        )
    }
}
