import React, { Component } from "react";
import { Icon, Input, Row, Col, Radio, Modal, message } from "antd";
import ColorPicker from "@/public/ColorPicker";
import styles from "./index.css";
import { View } from "react-web-dom";
import UploadImage from "@/uploadImage/index";
import ActionLink, { linkInfo } from "../common/actionLink"

const RadioGroup = Radio.Group;
// type LinkActionType = 'portal' | 'goods' | 'page' | 'url'
//
// type Props = {
//     componentName: string,
//     getValues: Function,
//     options: {
//         menu_format: number,
//         menu_space: number
//     },
//     data: Array<{
//         img: {
//             url: string
//         },
//         title: string,
//         link: {
//             action: LinkActionType,
//             param: {}
//         },
//         background_color: string,
//         font_color: string
//     }>
// }
// type State = {}

export default class Index extends Component {

    static defaultProps = {
        componentName: 'topMenu'
    }

    render() {
        const { options, data, getValues } = this.props
        const { menu_format, menu_space } = options
        return (
            <View className={`${styles.topMenuCtrlWarp} topMenuCtrlWarp`}>
                <Row>
                    <Col span={5}>菜单格式：</Col>
                    <Col span={19}>
                        <RadioGroup
                            value={menu_format}
                            onChange={(e) => {
                                getValues({
                                    options: { ...options, ...{ menu_format: e.target.value } },
                                    data
                                })
                            }}
                        >
                            <Radio value={1}>纯文字导航</Radio>
                            <Radio value={2}>小图标导航</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>菜单间距：</Col>
                    <Col span={19}>
                        <RadioGroup
                            value={menu_space}
                            onChange={(e) => {
                                getValues({
                                    options: { ...options, ...{ menu_space: e.target.value } },
                                    data
                                })
                            }}
                        >
                            <Radio value={1}>无间距</Radio>
                            <Radio value={2}>有间距</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                {
                    data.map((listItem, index) => {
                        return <View
                            className={styles.topMenuCtrlItem}
                            key={index}
                        >
                            <p className={styles.topMenuCtrlItemTop}>
                                {
                                    index > 0 ?
                                        <a
                                            onClick={() => {
                                                let _data = [...data]
                                                let add = [_data[index], _data[index - 1]]
                                                _data.splice(index - 1, 2, ...add)
                                                getValues({
                                                    options,
                                                    data: _data
                                                })
                                            }}
                                        >
                                            上移
                                        </a> : null
                                }
                                {
                                    index < data.length - 1 ?
                                        <a
                                            onClick={() => {
                                                let _data = [...data]
                                                let add = [_data[index + 1], _data[index]]
                                                _data.splice(index, 2, ...add)
                                                getValues({
                                                    options,
                                                    data: _data
                                                })
                                            }}
                                        >
                                            下移
                                        </a> : null
                                }
                                <a
                                    onClick={() => {
                                        Modal.confirm({
                                            title: '确认删除？',
                                            content: (
                                                <View>
                                                    <p>
                                                        标题：
                                                        {
                                                            listItem.title.length ? listItem.title : '未添加'
                                                        }
                                                    </p>
                                                    <p>
                                                        图标：
                                                        {
                                                            listItem.img.url.length ?
                                                                <img
                                                                    alt=''
                                                                    src={listItem.img.url}
                                                                    style={{ width: 80 }}
                                                                /> : '未添加'
                                                        }
                                                    </p>
                                                    <p>
                                                        链接：{linkInfo[listItem.link.action].alias}
                                                    </p>
                                                </View>
                                            ),
                                            okText: '确认',
                                            okType: 'danger',
                                            cancelText: '取消',
                                            onOk() {
                                                let _data = [...data]
                                                _data.splice(index, 1)
                                                getValues({
                                                    options,
                                                    data: _data
                                                })
                                                message.success('已删除', 1)
                                            },
                                            onCancel() {
                                                console.log('Cancel');
                                            },
                                        })
                                    }}
                                >
                                    删除
                                </a>
                            </p>
                            <View className={styles.topMenuCtrlItemBot}>
                                <View className={styles.topMenuCtrlItemRight}>
                                    <Row>
                                        <Col span={5}><span>标题：</span></Col>
                                        <Col span={19}>
                                            <Input
                                                style={{ width: 240 }}
                                                placeholder='标题必填'
                                                value={listItem.title}
                                                onChange={(e) => {
                                                    let _data = [...data]
                                                    _data[index].title = e.target.value
                                                    getValues({
                                                        options,
                                                        data: _data
                                                    })
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={5}><span>链接：</span></Col>
                                        <Col span={19}>
                                            <View className={styles.topMenuCtrlItemRightRow}>
                                                <ActionLink
                                                    type={listItem.link.action}
                                                    selectGoodsVisible={false}
                                                    selectPageVisible={false}
                                                    inputUrlVisible={false}
                                                    getValues={(state) => {
                                                        let _data = [...data]
                                                        _data[index].link.action = state.type
                                                        _data[index].link.param = state.value
                                                        getValues({
                                                            options,
                                                            data: _data
                                                        })
                                                    }}
                                                    value={() => {
                                                        switch (listItem.link.action) {
                                                            case 'portal':
                                                                return
                                                            case 'goods':
                                                                return listItem.link.param
                                                            case 'page':
                                                                return listItem.link.param
                                                            case 'url':
                                                                return listItem.link.param
                                                        }
                                                    }}
                                                />
                                            </View>
                                        </Col>
                                    </Row>
                                    {
                                        menu_format === 2 ?
                                            <Row>
                                                <Col span={5}><span>图标：</span></Col>
                                                <Col span={19}>
                                                    <View className={styles.topMenuCtrlItemLeft}>
                                                        <UploadImage
                                                            onChange={(e) => {
                                                                let _data = [...data]
                                                                _data[index].img = { url: e }
                                                                getValues({
                                                                    options,
                                                                    data: _data
                                                                })
                                                            }}
                                                            is_save={1}
                                                        >
                                                            {
                                                                listItem.img.url.length ?
                                                                    <img
                                                                        src={listItem.img.url}
                                                                        alt=''
                                                                        style={{ width: '20px' }}
                                                                    /> :
                                                                    <View className={styles.uploadBtn}>
                                                                        <Icon type='plus' />
                                                                        <p>上传图标</p>
                                                                    </View>
                                                            }
                                                        </UploadImage>
                                                    </View>
                                                </Col>
                                            </Row> : null
                                    }
                                    <Row>
                                        <Col span={5}>背景颜色：</Col>
                                        <Col span={19}>
                                            <ColorPicker
                                                color={listItem.background_color}
                                                colorChange={(color) => {
                                                    let _data = [...data]
                                                    _data[index].background_color = color.hex
                                                    getValues({
                                                        options,
                                                        data: _data
                                                    })
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={5}>文字颜色：</Col>
                                        <Col span={19}>
                                            <ColorPicker
                                                color={listItem.font_color}
                                                colorChange={(color) => {
                                                    let _data = [...data]
                                                    _data[index].font_color = color.hex
                                                    getValues({
                                                        options,
                                                        data: _data
                                                    })
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </View>
                            </View>
                        </View>
                    })
                }
                <View
                    className={styles.topMenuCtrlItemAdd}
                    onClick={() => {
                        let _data = [
                            ...data,
                            {
                                title: '文字',
                                img: {
                                    url: ''
                                },
                                link: {
                                    action: 'portal',
                                    param: {}
                                },
                                background_color: '#FFFFFF',
                                font_color: '#333333'
                            }
                        ]
                        getValues({
                            options,
                            data: _data
                        })
                    }}
                >
                    <Icon type='plus' /> 添加
                </View>
            </View>
        )
    }
}
