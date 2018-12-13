import React, { Component } from "react";
import { Icon, Input, Row, Col, Modal, message } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import ActionLink, { linkInfo } from "../common/actionLink"
// type Props = {
//     componentName: string,
//     getValues: Function,
//     options: {},
//     data: Array<{
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
        componentName: 'textNav'
    }

    render() {
        const { options, data, getValues } = this.props
        return (
            <View className={`${styles.textNavCtrlWarp} textNavCtrlWarp`}>
                {
                    data.map((listItem, index) => {
                        return <View
                            className={styles.textNavCtrlItem}
                            key={index}
                        >
                            <p className={styles.textNavCtrlItemTop}>
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
                                            },
                                        })
                                    }}
                                >
                                    删除
                                </a>
                            </p>
                            <View className={styles.textNavCtrlItemBot}>
                                <View className={styles.textNavCtrlItemRight}>
                                    <Row>
                                        <Col span={3}><span>标题：</span></Col>
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
                                        <Col span={3}><span>链接：</span></Col>
                                        <Col span={19}>
                                            <View className={styles.textNavCtrlItemRightRow}>
                                                <ActionLink
                                                    type={listItem.link.action}
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
                                </View>
                            </View>
                        </View>
                    })
                }
                <View
                    className={styles.textNavCtrlItemAdd}
                    onClick={() => {
                        let _data = [
                            ...data,
                            {
                                title: '这是标题',
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
