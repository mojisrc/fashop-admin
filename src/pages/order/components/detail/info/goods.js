import React, { Component, Fragment } from "react";
import { Table, Tag } from "antd";
import styles from "./index.css";

export default class OrderDetailGoodsInfo extends Component {
    static defaultProps = {
        extend_order_goods: [],
        amount: 0,
        freight_fee: 0,
        revise_amount: 0,
        revise_freight_fee: 0,
        discount: {
            coupon_amount: "0.00",
            member_amount: "0.00",
            points_amount: "0.00",
            reward_amount: "0.00"
        },
        points: 0,
        pay_balance: 0,
        is_revise: 0,
        is_revise_freight: 0,
    };

    render() {
        const { extend_order_goods, amount, freight_fee, revise_amount, revise_freight_fee, discount, points, pay_balance, is_revise, is_revise_freight } = this.props;
        const { coupon_amount, member_amount, points_amount, reward_amount } = discount;

        const columns = [
            {
                title: "商品描述",
                dataIndex: "goods_img",
                key: "goods_img",
                render: (text, record) => <div className={styles.goodsDesc}>
                    <img src={record.goods_img} />
                </div>
            }, {
                title: "规格",
                dataIndex: "goods_spec",
                key: "goods_spec",
                render: (goods_spec) => {
                    return goods_spec.map(function(item, index) {
                        return item.value_id > 0 && <Tag key={index}>{item.value_name}</Tag>;
                    });
                }
            }, {
                title: "单价（元）",
                dataIndex: "goods_price",
                key: "goods_price"
            }, {
                title: "数量",
                dataIndex: "goods_num",
                key: "goods_num"
            }, {
                title: "小计（元）",
                dataIndex: "goods_pay_price",
                key: "goods_pay_price"
            }
        ];

        return (
            <div className={styles.infoWarp}>
                <p className={styles.infoTitle}>商品信息</p>
                <Table
                    bordered
                    key='order_goods_table'
                    columns={columns}
                    dataSource={extend_order_goods}
                    pagination={false}
                    rowKey={record => `${record.id}`}
                    footer={() =>
                        <Fragment>
                            <p className={styles.tableFooter}>
                                共 {extend_order_goods.length} 件商品 &nbsp;
                                合计：￥{amount}（含运费：￥{freight_fee}）
                            </p>
                            {is_revise === 1 && <p className={styles.tableFooterReviseAmount}>改价后
                                合计：{revise_amount}（含运费：￥{is_revise_freight === 1 ? revise_freight_fee : freight_fee}）</p>}


                            {points > 0 && <div className={styles.tableFooterDiscount}>
                                <span className={styles.label}>积分消耗：</span>
                                <span className={styles.text}>¥{points}</span>
                            </div>}
                            {parseFloat(pay_balance) > 0 && <div className={styles.tableFooterDiscount}>
                                <span className={styles.label}>余额支付：</span>
                                <span className={styles.text}>¥{pay_balance}</span>
                            </div>}

                            {typeof coupon_amount !== "undefined" && parseFloat(coupon_amount) > 0 &&
                            <div className={styles.tableFooterDiscount}>
                                <span className={styles.label}>优惠券抵扣：</span>
                                <span className={styles.text}>- ¥{coupon_amount}</span>
                            </div>}
                            {typeof member_amount !== "undefined" && parseFloat(member_amount) > 0 &&
                            <div className={styles.tableFooterDiscount}>
                                <span className={styles.label}>会员卡抵扣：</span>
                                <span className={styles.text}>- ¥{member_amount}</span>
                            </div>}
                            {typeof points_amount !== "undefined" && parseFloat(points_amount) > 0 &&
                            <div className={styles.tableFooterDiscount}>
                                <span className={styles.label}>积分抵扣：</span>
                                <span className={styles.text}>- ¥{points_amount}</span>
                            </div>}
                            {typeof reward_amount !== "undefined" && parseFloat(reward_amount) > 0 &&
                            <div className={styles.tableFooterDiscount}>
                                <span className={styles.label}>满减抵扣：</span>
                                <span className={styles.text}>- ¥{reward_amount}</span>
                            </div>}
                        </Fragment>
                    }
                />
            </div>
        );
    }
}
