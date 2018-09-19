//@flow
import React, { Component } from "react";
import { View } from "react-web-dom";
import { Slider, Row, Col } from "antd";

type Props = {
    componentName?:string,
    getValues: Function,
    options: {
        height: number
    },
    data: {}
}
type State = {}

export default class Index extends Component<Props, State> {
    static defaultProps = {
        componentName: 'auxiliaryBlank'
    }
    render() {
        const { options,data, getValues } = this.props
        const { height } = options
        return (
            <View className={`auxiliaryBlankCtrlWarp`}>
                <Row gutter={16}>
                    <Col span={4}>高度：</Col>
                    <Col span={16}>
                        <Slider
                            value={height}
                            onChange={(height) => {
                                getValues({
                                    options: {
                                        height
                                    },
                                    data
                                })
                            }}
                        />
                    </Col>
                    <Col span={4}>{height}</Col>
                </Row>
            </View>
        )
    }
}
