import React, { Component } from "react";
import {  Table, Alert, message, InputNumber, Modal, Spin } from "antd";
import styles from "./index.css";
import { View, Text } from "@/components/flexView";
import update from "immutability-helper";

export default class EvaluateListHeader extends Component {
    static defaultProps = {
        onCancel: function () {
        },
        onOk: function () {
        },
        visible: false
    }
    state = {
        goodsList: [],
        amount: 0,
        freight_fee: 0,
        spinning: true,
        goods: []
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.orderId !== this.props.orderId) {
            await this.initOrderInfo()
        }
    }

    async componentDidMount() {
        await this.initOrderInfo()
    }

    async initOrderInfo() {
        const { orderId } = this.props
        this.setState({
            spinning: true
        })
        const response = await info({ params: { id: orderId } })
        const { extend_order_goods, amount, freight_fee } = response.result.info
        if (response.code === 0) {
            this.setState({
                goodsList: extend_order_goods,
                amount,
                freight_fee,
                spinning: false,
                goods: extend_order_goods.map((goods) => {
                    return {
                        order_goods_id: goods.id,
                        goods_price_discount: 0.00,
                        _goods_price_discount_percentage: 0.00
                    }
                })
            })
        } else {
            message.warning("订单详情获取失败")
        }
    }

    render() {
        const { onCancel, onOk, visible } = this.props
        const { goodsList, freight_fee, goods,spinning } = this.state
        let _goods = [...goods]

        const columns = [
            {
                title: '商品描述',
                dataIndex: 'goods_img',
                key: 'goods_img',
                render: (text, record) => <View className={styles.goodsDesc}>
                    <img src={record.goods_img} />
                    <View style={{ width: 200 }}>
                        <span>{record.goods_title}</span>
                        <div>
                            {record.goods_spec[0].value_id > 0 ? record.goods_spec.map((item, index) => {
                                return `${item.name}:${item.value_name}`
                            }).join(',') : ''}
                        </div>
                    </View>
                </View>
            }, {
                title: '数量',
                dataIndex: 'goods_num',
                key: 'goods_num',
            }, {
                title: '单价（元）',
                dataIndex: 'goods_price',
                key: 'goods_price',
            }, {
                title: '小计（元）',
                dataIndex: 'goods_pay_price',
                key: 'goods_pay_price',
            }, {
                title: '涨价或折扣',
                dataIndex: 'goods_price',
                key: 'discount',
                render: (value, row, index) => {
                    const goods_price_discount = goods[index].goods_price_discount
                    return <div>
                        <InputNumber
                            style={{
                                width: 60
                            }}
                            precision={1}
                            min={0}
                            max={9.9}
                            value={goods[index]._goods_price_discount_percentage > 0 ? goods[index]._goods_price_discount_percentage : null}
                            step={0.1}
                            onChange={(e) => {
                                const price_discount = parsePrice(-goodsList[index].goods_price * (e !== null ? e : 0) / 10)
                                _goods[index] = update(_goods[index], {
                                    goods_price_discount: { $set: e != null && _goods[index].goods_price_discount !== price_discount ? price_discount : _goods[index].goods_price_discount },
                                    _goods_price_discount_percentage: { $set: parsePrice(e).toFixed(1) }
                                })
                                this.setState({
                                    goods: _goods
                                })
                            }}
                        /> 折=
                        <InputNumber
                            style={{
                                width: 100
                            }}
                            precision={2}
                            formatter={goods_price_discount => `${goods_price_discount ? goods_price_discount > 0 ? '涨' : '减' : ''}${goods_price_discount}`}
                            min={-value}
                            value={goods_price_discount}
                            onChange={(e) => {
                                _goods[index] = update(_goods[index], {
                                    goods_price_discount: { $set: parsePrice(e) },
                                    _goods_price_discount_percentage: { $set: _goods[index].goods_price_discount !== parsePrice(e) ? 0.0 : _goods[index]._goods_price_discount_percentage }
                                })
                                this.setState({
                                    goods: _goods
                                })
                            }}
                        /> 元
                    </div>
                }
            }, {
                title: '运费（元）',
                dataIndex: 'goods_pay_price',
                key: 'freight_fee',
                render: (value, row, index) => {
                    return {
                        children: <div>
                            <InputNumber
                                style={{
                                    width: 100
                                }}
                                precision={2}
                                formatter={freight_fee => `${freight_fee}`}
                                min={0}
                                value={freight_fee}
                                onChange={(e) => {
                                    this.setState({
                                        freight_fee: e
                                    })
                                }}
                            /> 元
                        </div>,
                        props: {
                            rowSpan: index === 0 ? goodsList.length : 0
                        },
                    }
                }
            }
        ]
        const freightFee = parsePrice(freight_fee)
        const originPrice = parsePrice(eval(goodsList.map((item) => {
            return item.goods_price
        }).join("+")))
        const goodsPriceDiscount = parsePrice(eval(goods.map((item) => {
            return item.goods_price_discount
        }).join("+")))
        const total = parsePrice(originPrice + freightFee + goodsPriceDiscount)
        return (
            <Modal
                title="修改价格"
                width={980}
                visible={visible}
                onOk={async () => {
                    if (typeof onOk === 'function') {
                        const result = await this.onSubmit()
                        if (result === true) {
                            onCancel()
                        }
                    }
                }}
                onCancel={() => {
                    if (typeof onCancel === 'function') {

                        this.props.onCancel()
                    }
                }}
            >
                <Spin tip="加载中..." spinning={spinning}>
                <Alert message="只有待支付订单才支持修改价格，改价后请联系买家核对订单金额后再支付" type="info" showIcon />
                <Table
                    key='order_goods_table'
                    columns={columns}
                    dataSource={goodsList}
                    pagination={false}
                    rowKey={record => `${record.id}`}
                />
                <div className={styles.resultPrice}>
                    <span><em>买家实付：</em>{originPrice.toFixed(2)} + {freightFee.toFixed(2)} + {goodsPriceDiscount.toFixed(2)} = </span><label>{total.toFixed(2)} </label><span>元</span>
                </div>
                <div className={styles.resultPriceIntro}>买家实付 = 原价 + 运费 + 涨价或折扣</div>
                </Spin>
            </Modal>
        );
    }

    async onSubmit() {
        return await true
    }
}
