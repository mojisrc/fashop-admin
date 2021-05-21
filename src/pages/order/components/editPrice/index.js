import { Icon } from '@ant-design/compatible';
import React, { Component } from "react";
import { Table, Alert, message, InputNumber, Modal, Spin } from "antd";
import styles from "./index.css";
import { View, Text } from "@/components/flexView/index";
import update from "immutability-helper";
import { parsePrice } from "@/utils/index";
import { connect } from "umi";


@connect(({ order, loading }) => ({
    orderInfo: order.info.result,
    orderInfoLoading: loading.effects["order/info"]
}), null, null, {
    forwardRef: true
})
class OrderEditPrice extends Component {
    static defaultProps = {
        orderInfo: {
            result: {
                info: {
                    extend_order_goods: [], amount: 0, freight_fee: 0
                }
            }
        },
        orderInfoLoading: true
    };
    state = {
        goodsList: [],
        amount: 0,
        freight_fee: 0,
        goods: [],
        visible: false,
        origin_freight_fee: 0
    };

    show({ orderId }) {
        this.setState({
            orderId,
            visible: true
        }, () => {
            this.initOrderInfo();
        });
    }

    initOrderInfo() {
        const { dispatch } = this.props;
        const { orderId } = this.state;
        dispatch({
            type: "order/info",
            payload: {
                id: orderId
            },
            callback: (response) => {
                const { extend_order_goods, amount, freight_fee } = response.result.info;
                if (response.code === 0) {
                    this.setState({
                        goodsList: extend_order_goods,
                        amount,
                        freight_fee,
                        origin_freight_fee: freight_fee,
                        goods: extend_order_goods.map((goods) => {
                            return {
                                order_goods_id: goods.id,
                                goods_price_discount: 0.00,
                                _goods_price_discount_percentage: 0.00
                            };
                        })
                    });
                } else {
                    message.warning("订单详情获取失败");
                }
            }
        });
    }

    render() {
        const { orderInfoLoading } = this.props;
        const { goodsList, freight_fee, goods, visible,amount } = this.state;
        let _goods = [...goods];

        const columns = [
            {
                title: "商品描述",
                dataIndex: "goods_img",
                key: "goods_img",
                render: (text, record) => <View className={styles.goodsDesc}>
                    <img src={record.goods_img} />
                    <View style={{ width: 200 }}>
                        <span>{record.goods_title}</span>
                        <div>
                            {record.goods_spec[0].value_id > 0 ? record.goods_spec.map((item) => {
                                return `${item.name}:${item.value_name}`;
                            }).join(",") : ""}
                        </div>
                    </View>
                </View>
            }, {
                title: "数量",
                dataIndex: "goods_num",
                key: "goods_num"
            }, {
                title: "单价（元）",
                dataIndex: "goods_price",
                key: "goods_price"
            }, {
                title: "小计（元）",
                dataIndex: "goods_pay_price",
                key: "goods_pay_price"
            }, {
                title: "涨价或折扣",
                dataIndex: "goods_price",
                key: "discount",
                render: (value, row, index) => {
                    const goods_price_discount = goods[index].goods_price_discount;
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
                                const price_discount =  -(goodsList[index].goods_pay_price - parsePrice(goodsList[index].goods_pay_price * (e !== null ? e : 0) / 10));
                                _goods[index] = update(_goods[index], {
                                    goods_price_discount: { $set: e != null && _goods[index].goods_price_discount !== price_discount ? price_discount : _goods[index].goods_price_discount },
                                    _goods_price_discount_percentage: { $set: parsePrice(e).toFixed(1) }
                                });
                                this.setState({
                                    goods: _goods
                                });
                            }}
                        /> 折=
                        <InputNumber
                            style={{
                                width: 100
                            }}
                            precision={2}
                            formatter={goods_price_discount => `${goods_price_discount ? goods_price_discount > 0 ? "涨" : "减" : ""}${goods_price_discount}`}
                            min={-value}
                            value={goods_price_discount}
                            onChange={(e) => {
                                _goods[index] = update(_goods[index], {
                                    goods_price_discount: { $set: parsePrice(e) },
                                    _goods_price_discount_percentage: { $set: _goods[index].goods_price_discount !== parsePrice(e) ? 0.0 : _goods[index]._goods_price_discount_percentage }
                                });
                                this.setState({
                                    goods: _goods
                                });
                            }}
                        /> 元
                    </div>;
                }
            }, {
                title: "运费（元）",
                dataIndex: "goods_pay_price",
                key: "freight_fee",
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
                                    });
                                }}
                            /> 元
                        </div>,
                        props: {
                            rowSpan: index === 0 ? goodsList.length : 0
                        }
                    };
                }
            }
        ];
        const freightFee = parsePrice(freight_fee);
        const goodsPriceDiscount = parsePrice(eval(goods.map((item) => {
            return item.goods_price_discount;
        }).join("+")));
        const total = parsePrice(parseInt(amount) + freightFee + goodsPriceDiscount);
        return (
            <Modal
                title="修改价格"
                width={980}
                visible={visible}
                onOk={() => {
                    this.onSubmit();
                }}
                onCancel={() => {
                    this.setState({
                        visible: false
                    });
                }}
            >
                <Spin tip="加载中..." spinning={orderInfoLoading}>
                    <Alert message="只有待支付订单才支持修改价格，改价后请联系买家核对订单金额后再支付" type="info" showIcon />
                    <Table
                        key='order_goods_table'
                        columns={columns}
                        dataSource={goodsList}
                        pagination={false}
                        rowKey={record => `${record.id}`}
                    />
                    <div className={styles.resultPrice}>
                        <span><em>买家实付：</em>{amount} + {freightFee.toFixed(2)} + {goodsPriceDiscount.toFixed(2)} = </span><label>{total.toFixed(2)} </label><span>元</span>
                    </div>
                    <div className={styles.resultPriceIntro}>买家实付 = 商品实付 + 运费 + 涨价或折扣</div>
                </Spin>
            </Modal>
        );
    }

    onSubmit() {
        const { dispatch } = this.props;
        const { freight_fee, goods, origin_freight_fee } = this.state;
        let total_goods_amount = 0;
        let payload = {
            revise_goods: goods.map((item) => {
                total_goods_amount += parseFloat(item.goods_price_discount);
                return {
                    id: item.order_goods_id,
                    difference_price: item.goods_price_discount
                };
            })
        };
        // 不修改运费不要传给后端
        if (parseFloat(origin_freight_fee) !== parseFloat(freight_fee)) {
            payload["revise_freight_fee"] = freight_fee;
        }
        if (total_goods_amount === 0 && parseFloat(freight_fee) === 0) {
            message.error("请先修改价格");
        } else {
            dispatch({
                type: "order/changePrice",
                payload,
                callback: (response) => {
                    if (response.code === 0) {
                        message.success("已保存");
                        this.setState({
                            visible: false
                        });
                    } else {
                        message.error(response.msg);
                    }
                }
            });
        }
    }
}

export default OrderEditPrice;
