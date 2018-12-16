import React, { Component } from "react";
import { Icon, Input, Modal, message, Radio, Row, Col } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import UploadImage from "@/components/uploadImage";
import ActionLink, { linkInfo } from "../common/actionLink"
const RadioGroup = Radio.Group;
// type LinkActionType = 'portal' | 'goods' | 'page' | 'url'
//
// type Props = {
//     componentName?: string,
//     getValues: Function,
//     options: {
//         rows: number,
//         each_row_display: number,
//     },
//     data: Array<{
//         img: {
//             url: string
//         },
//         title: string,
//         link: {
//             action: LinkActionType,
//             param: {}
//         }
//     }>
// }
// type State = {}

export default class Index extends Component {

    static defalutProps = {
        componentName: 'imageNav'
    }

    render() {
        const { data, options, getValues } = this.props
        const { rows, each_row_display } = options
        return (
            <View className={`${styles.imgNavCtrlWarp} imgNavCtrlWarp`}>
                {/*<Row>*/}
                {/*<Col span={4}>行数：</Col>*/}
                {/*<Col span={19}>*/}
                {/*<RadioGroup*/}
                {/*value={rows}*/}
                {/*onChange={(e) => {*/}
                {/*let _options = options*/}
                {/*_options.rows = e.target.value*/}
                {/*getValues({*/}
                {/*options: _options,*/}
                {/*data*/}
                {/*})*/}
                {/*}}*/}
                {/*>*/}
                {/*<Radio value={1}>1 行</Radio>*/}
                {/*<Radio value={2}>2 行</Radio>*/}
                {/*<Radio value={3}>3 行</Radio>*/}
                {/*<Radio value={4}>4 行</Radio>*/}
                {/*</RadioGroup>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                <Row>
                    <Col span={4}>每行数：</Col>
                    <Col span={19}>
                        <RadioGroup
                            value={each_row_display}
                            onChange={(e) => {
                                let _options = options
                                _options.each_row_display = e.target.value
                                getValues({
                                    options: _options,
                                    data
                                })
                            }}
                        >
                            <Radio value={1}>1 个</Radio>
                            <Radio value={2}>2 个</Radio>
                            <Radio value={3}>3 个</Radio>
                            <Radio value={4}>4 个</Radio>
                            <Radio value={5}>5 个</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>设置图片：</Col>
                    <Col span={19}>
                        <p>建议图片像素为40 x 40</p>
                    </Col>
                </Row>
                {
                    data.map((listItem, index) => (
                        <View
                            className={styles.imgNavCtrlItem}
                            key={index}
                        >
                            <p className={styles.imgNavCtrlItemTop}>
                                {
                                    index > 0 ?
                                        <a
                                            onClick={() => {
                                                let _data = data
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
                                                let _data = data
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
                                                        图片：
                                                        {
                                                            listItem.img.url.length ?
                                                                <img
                                                                    alt=''
                                                                    src={listItem.img.url}
                                                                    style={{ height: 35 }}
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
                                                let _data = data
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
                            <View className={styles.imgNavCtrlItemBot}>
                                <View className={styles.imgNavCtrlItemLeft}>
                                    <UploadImage
                                        onChange={(e) => {
                                            let _data = data
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
                                                    style={{ width: '80px' }}
                                                /> :
                                                <View className={styles.uploadBtn}>
                                                    <Icon type='plus' />
                                                    <p>上传图标</p>
                                                </View>
                                        }
                                    </UploadImage>
                                </View>
                                <View className={styles.imageNavCtrlItemRight}>
                                    <p>
                                        <span>标题：</span>
                                        <Input
                                            style={{ width: 240 }}
                                            placeholder='标题必填'
                                            value={listItem.title}
                                            onChange={(e) => {
                                                let _data = data
                                                _data[index].title = e.target.value
                                                getValues({
                                                    options,
                                                    data: _data
                                                })
                                            }}
                                        />
                                    </p>
                                    <div className={styles.imageNavCtrlItemRightRow}>
                                        <span>链接：</span>
                                        <ActionLink
                                            type={listItem.link.action}
                                            selectGoodsVisible={false}
                                            selectPageVisible={false}
                                            inputUrlVisible={false}
                                            getValues={(state) => {
                                                let _data = data
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
                                    </div>
                                </View>
                            </View>
                        </View>
                    ))
                }
                <View
                    className={styles.imgNavCtrlItemAdd}
                    onClick={() => {
                        let _data = [
                            ...data,
                            {
                                img: {
                                    url: require('@/assets/images/page/view/image-nav-default.png')
                                },
                                title: '文字',
                                link: {
                                    action: 'portal',
                                    param: {}
                                }
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
