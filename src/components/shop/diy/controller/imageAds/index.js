import React, { Component } from "react";
import { Icon, Input, Row, Col, Radio, Modal, message } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import UploadImage from "@/components/uploadImage";
import ActionLink, { linkInfo } from "../common/actionLink"

const RadioGroup = Radio.Group;
// type LinkActionType = 'portal' | 'goods' | 'page' | 'url'
//
// type Props = {
//     componentName?: string,
//     options: {
//         layout_style: number
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
//     }>,
//     getValues: Function
// }
// type State = {}

export default class Index extends Component {
    static defalutProps = {
        componentName: 'imageAds'
    }

    render() {
        let { options, data, getValues } = this.props
        const { layout_style } = options
        return (
            <View className={`${styles.imageAdsCtrlWarp} imageAdsCtrlWarp`}>
                <Row>
                    <Col span={5}>显示形式：</Col>
                    <Col span={19}>
                        <RadioGroup
                            value={layout_style}
                            onChange={(e) => {
                                getValues({
                                    options: { ...options, ...{ layout_style: e.target.value } },
                                    data
                                })
                            }}
                        >
                            <Radio value={1}>折叠轮播</Radio>
                            <Radio value={2}>上下平铺</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>设置图片：</Col>
                    <Col span={19}>
                        <p>建议图片最大宽度不超过640px</p>
                    </Col>
                </Row>
                {
                    Array.isArray(data) && data.length > 0 ? data.map((listItem, index) => (
                        <View
                            className={styles.imageAdsCtrlItem}
                            key={index}
                        >
                            <p className={styles.imageAdsCtrlItemTop}>
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
                                                _data.splice(index - 1, 2, ...add)
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
                            <View className={styles.imageAdsCtrlItemBot}>
                                <View className={styles.imageAdsCtrlItemLeft}>
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
                                            typeof listItem.img.url === 'string' && listItem.img.url.indexOf('http') > -1 ?
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
                                <View className={styles.imageAdsCtrlItemRight}>
                                    <p>
                                        <span>标题：</span>
                                        <Input
                                            style={{ width: 240 }}
                                            placeholder='标题可以不设置'
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
                                    <div className={styles.imageAdsCtrlItemRightRow}>
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
                    )) : null
                }
                <View
                    className={styles.imageAdsCtrlItemAdd}
                    onClick={() => {
                        let _data = [...data, {
                            img: {
                                url: require('@/assets/images/page/view/image-ads-default.png')
                            },
                            title: '',
                            link: {
                                action: 'portal',
                                param: {}
                            }
                        }]
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
