
import React, { Component } from "react";
import { Icon, Input, Row, Col, Radio } from "antd";
import ColorPicker from "../../../../public/ColorPicker";
import styles from "./index.css";
import { View } from "react-web-dom";
import UploadImage from "../../../../uploadImage/index";

const RadioGroup = Radio.Group;

type Props = {
    componentName: string,
    getValues: Function,
    options: {
        title: string,
        align: string,
        background_color: string,
        font_color: string,
        leading_image: {
            url: string
        }
    },
    data: {}
}
type State = {}

export default class Index extends Component {
    static defaultProps = {
        componentName: 'title'
    }

    render() {
        const { options, data, getValues } = this.props
        const { title, align, background_color, font_color, leading_image } = options
        return (
            <View className={`${styles.titleCtrlWarp} titleCtrlWarp`}>
                <View
                    className={styles.titleCtrlItem}
                >
                    <View className={styles.titleCtrlItemBot}>
                        <View className={styles.titleCtrlItemRight}>
                            <Row>
                                <Col span={5}><span>标题名称：</span></Col>
                                <Col span={19}>
                                    <Input
                                        style={{ width: 240 }}
                                        value={title}
                                        onChange={(e) => {
                                            getValues({
                                                options: { ...options, ...{ title: e.target.value } },
                                                data
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}>对齐方式：</Col>
                                <Col span={19}>
                                    <RadioGroup
                                        value={align}
                                        onChange={(e) => {
                                            getValues({
                                                options: { ...options, ...{ align: e.target.value } },
                                                data
                                            })
                                        }}
                                    >
                                        <Radio value={'left'}>左对齐</Radio>
                                        <Radio value={'center'}>居中对齐</Radio>
                                        <Radio value={'right'}>右对齐</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}>背景颜色：</Col>
                                <Col span={19}>
                                    <ColorPicker
                                        color={background_color}
                                        colorChange={(color) => {
                                            getValues({
                                                options: { ...options, ...{ background_color: color.hex } },
                                                data
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}>文字颜色：</Col>
                                <Col span={19}>
                                    <ColorPicker
                                        color={font_color}
                                        colorChange={(color) => {
                                            getValues({
                                                options: { ...options, ...{ font_color: color.hex } },
                                                data
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}><span>前导图片：</span></Col>
                                <Col span={19}>
                                    <View className={styles.titleCtrlItemLeft}>
                                        <UploadImage
                                            onChange={(e) => {
                                                getValues({
                                                    options: { ...options, ...{ leading_image: { url: e } } },
                                                    data
                                                })
                                            }}
                                            is_save={1}
                                        >
                                            {
                                                leading_image.url.length ?
                                                    <img
                                                        src={leading_image.url}
                                                        alt=''
                                                        style={{ width: '30px' }}
                                                    /> :
                                                    <View className={styles.uploadBtn}>
                                                        <Icon type='plus' />
                                                        <p>上传图标</p>
                                                    </View>
                                            }
                                        </UploadImage>
                                    </View>
                                </Col>
                            </Row>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
