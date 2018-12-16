import React, { Component } from "react";
import { Row, Col, Icon, Modal, message, Radio } from "antd";
import styles from "./index.css";
import SeleceGoods from "@/components/public/selectGoods/index";
import { View } from "react-web-dom";
import Image from "@/components/image/index";

const RadioGroup = Radio.Group;
//
// type Props = {
//     options: {
//         layout_direction: number,
//     },
//     data: Array<{
//         id: number,
//         img: {
//             url: string
//         },
//         title: string,
//         price: number,
//         // market_price: number,
//         // desc: string
//     }>,
//     getValues: Function,
//     componentName?: string
// }
//
// type State = {
//     addGoodsVisible: boolean,
//     delectShow: boolean,
//     currentId: number,
// }

export default class Index extends Component  {
    state = {
        delectShow: false,
        addGoodsVisible: false,
        currentId: 0
    }
    static defaultProps ={
        componentName: 'goods',
    }
    render() {
        const { delectShow, addGoodsVisible, currentId } = this.state
        const { options, data, getValues } = this.props
        const { layout_direction } = options
        return (
            <View className={styles.goodsCtrlWarp}>
                <Row gutter={16} style={{ marginBottom: 20 }}>
                    {
                        data.map((listItem, index) => (
                            <Col
                                key={index}
                                span={6}
                                onMouseEnter={() => {
                                    this.setState({
                                        delectShow: true,
                                        currentId: listItem.id
                                    })
                                }}
                                onMouseLeave={() => {
                                    this.setState({
                                        delectShow: false,
                                        currentId: listItem.id
                                    })
                                }}
                                style={{ position: 'relative' }}
                            >
                                <View className={`${styles.goodsCtrlImgItemWarp} ${styles.goodsCtrlImgWarp}`}>
                                    <Image
                                        src={listItem.img}
                                    />
                                </View>
                                {
                                    currentId === listItem.id && delectShow ? <View
                                        className={`${styles.goodsCtrlImgItemWarp} ${styles.goodsCtrlImgDelectWarp}`}>
                                        <a
                                            onClick={() => {
                                                Modal.confirm({
                                                    title: '确认删除?',
                                                    content: (
                                                        <View className={styles.goodsCtrlConfirmDelete}>
                                                            <Image src={listItem.img} />
                                                            <p>{listItem.title}</p>
                                                            <span>￥{listItem.price}</span>
                                                        </View>
                                                    ),
                                                    maskClosable: true,
                                                    okText: '确认',
                                                    okType: 'danger',
                                                    cancelText: '取消',
                                                    onOk: () => {
                                                        let _data = data.filter((dataItem) => {
                                                            return dataItem.id !== listItem.id
                                                        })
                                                        getValues({
                                                            options,
                                                            data: _data
                                                        })
                                                        message.success('已删除', 1)
                                                    }
                                                })
                                            }}
                                        >
                                            删除
                                        </a>
                                    </View> : null
                                }
                            </Col>
                        ))
                    }
                    <Col span={6}>
                        <View
                            className={`${styles.goodsCtrlImgItemWarp} ${styles.goodsCtrlAddWarp}`}
                            onClick={() => {
                                this.setState({
                                    addGoodsVisible: true
                                })
                            }}
                        >
                            <Icon type="plus" />
                            <span>添加</span>
                        </View>
                    </Col>
                    <SeleceGoods
                        visible={addGoodsVisible}
                        close={() => {
                            this.setState({ addGoodsVisible: false })
                        }}
                        multiSelect={true}
                        onOk={(goodsList) => {
                            const _data = data
                            goodsList.map((item) =>
                                _data.push({
                                    id: item.id,
                                    img: item.img,
                                    title: item.title,
                                    price: item.price,
                                    // market_price: item.price,
                                    // desc: item.desc ? item.desc : ''
                                })
                            )
                            this.setState({
                                addGoodsVisible: false
                            }, () => {
                                getValues({
                                    options,
                                    data: _data
                                })
                            })
                        }}
                    />
                </Row>
                <Row>
                    <Col span={24}>
                        <RadioGroup
                            value={layout_direction}
                            onChange={(e) => {
                                getValues({
                                    options: { ...options, ...{ layout_direction: e.target.value } },
                                    data
                                })
                            }}
                        >
                            <Radio value={1}>小图</Radio>
                            <Radio value={2}>大图</Radio>
                            <Radio value={3}>一大两小</Radio>
                            <Radio value={4}>列表</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
            </View>
        )
    }
}
