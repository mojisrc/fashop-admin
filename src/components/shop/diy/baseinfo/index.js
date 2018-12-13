import React, { Component } from "react";
import { Input, Row, Col } from "antd";
import ColorPicker from "@/public/ColorPicker";
import styles from "../controller/title/index.css";
import { View } from "react-web-dom";
const { TextArea } = Input;

// type Props = {
//     name: string,
//     description: string,
//     backgroundColor: string,
//     getValues: Function
// }
// type State = {
// }

export default class Index extends Component {

    render() {
        const { name, description, backgroundColor, getValues } = this.props
        return (
            <View className={`${styles.titleCtrlWarp} titleCtrlWarp`}>
                <View
                    className={styles.titleCtrlItem}
                >
                    <View className={styles.titleCtrlItemBot}>
                        <View className={styles.titleCtrlItemRight}>
                            <Row>
                                <Col span={5}><span>页面名称：</span></Col>
                                <Col span={19}>
                                    <Input
                                        placeholder='请输入'
                                        value={name}
                                        onChange={(e) => {
                                            getValues({
                                                name: e.target.value,
                                                description,
                                                backgroundColor
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5} />
                                <Col span={19}>
                                    页面名称便于后台查找
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}><span>页面描述：</span></Col>
                                <Col span={19}>
                                    <TextArea
                                        placeholder='请输入'
                                        autosize={{ minRows: 5, maxRows: 8 }}
                                        value={description}
                                        onChange={(e) => {
                                            getValues({
                                                description: e.target.value,
                                                name,
                                                backgroundColor
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5} />
                                <Col span={19}>
                                    用户通过微信分享给朋友时显示的描述内容
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}>背景颜色：</Col>
                                <Col span={19}>
                                    <ColorPicker
                                        color={backgroundColor}
                                        colorChange={(color) => {
                                            getValues({
                                                backgroundColor: color.hex,
                                                name,
                                                description
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
