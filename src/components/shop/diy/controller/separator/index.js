//@flow
import React, { Component } from "react";
import { View } from "react-web-dom";
import { Row, Col, Radio } from "antd";
import styles from "./index.css";
import ColorPicker from "../../../../public/ColorPicker";

const RadioGroup = Radio.Group;

type Props = {
    componentName?: string,
    getValues: Function,
    options: {
        color: string,
        style: string
    },
    data: {}
}
type State = {}

export default class Index extends Component<Props, State> {

    static defalutProps = {
        componentName: 'separator'
    }

    render() {
        const { options, data, getValues } = this.props
        const { color, style } = options
        return (
            <View className={`${styles.separatorCtrlWarp} separatorCtrlWarp`}>
                <Row>
                    <Col span={5}>颜色：</Col>
                    <Col span={19}>
                        <ColorPicker
                            color={color}
                            colorChange={(color) => {
                                getValues({
                                    options: { ...options, ...{ color: color.hex } },
                                    data
                                })
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>样式：</Col>
                    <Col span={19}>
                        <RadioGroup
                            value={style}
                            onChange={(e) => {
                                getValues({
                                    options: { ...options, ...{ style: e.target.value } },
                                    data
                                })
                            }}
                        >
                            <Radio value={'dashed'}>虚线</Radio>
                            <Radio value={'solid'}>实线</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
            </View>
        )
    }
}
