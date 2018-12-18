import React, { Component } from "react";
import { Table, Tag } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";

export default class OrderDetailGoodsInfo extends Component {
    render() {
        const { extend_order_goods, amount, freight_fee } = this.props
        const columns = [
            {
                title: '商品描述',
                dataIndex: 'goods_img',
                key: 'goods_img',
                render: (text, record) => <View className={styles.goodsDesc}>
                    <img src={record.goods_img}  />
                    <span>{record.goods_title}</span>
                </View>
            }, {
                title: '规格',
                dataIndex: 'goods_spec',
                key: 'goods_spec',
                render: (goods_spec) => {
                    return goods_spec.map(function (item,index) {
                        return item.value_id > 0 && <Tag key={index}>{item.value_name}</Tag>
                    })
                }
            }, {
                title: '单价（元）',
                dataIndex: 'goods_price',
                key: 'goods_price',
            }, {
                title: '数量',
                dataIndex: 'goods_num',
                key: 'goods_num',
            }, {
                title: '小计（元）',
                dataIndex: 'goods_pay_price',
                key: 'goods_pay_price',
            }
        ]

        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>商品信息</p>
                <Table
                    key='order_goods_table'
                    columns={columns}
                    dataSource={extend_order_goods}
                    pagination={false}
                    rowKey={record => `${record.id}`}
                    footer={() =>
                        <p className={styles.tableFooter}>
                            共 {extend_order_goods.length} 件商品 &nbsp;
                            合计：￥{amount}（含运费：￥{freight_fee}）
                        </p>
                    }
                />
            </View>
        );
    }
}
