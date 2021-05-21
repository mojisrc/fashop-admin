import React, { Component } from "react";
import { Table, Tag } from "antd";
import styles from "../index.css";
import { View } from "@/components/flexView";

export default class OrderDetailGoodsInfo extends Component {
    render() {
        const {
            goods_id,
            goods_title,
            goods_img,
            goods_spec,
            goods_num,
            goods_pay_price
        } = this.props;
        const columns = [
            {
                title: "商品描述",
                dataIndex: "goods_img",
                key: "goods_img",
                render: (text, record,index) => <View className={styles.goodsDesc} key={`goods_img${index}`}>
                    <img src={record.goods_img} alt='' />
                    <span>{record.goods_title}</span>
                </View>
            }, {
                title: "规格",
                dataIndex: "goods_spec",
                key: "goods_spec",
                render: (goods_spec) => {
                    if (Array.isArray(goods_spec) && goods_spec.length > 0) {
                        return goods_spec.map(function(item, index) {
                            return item.value_id > 0 && <Tag key={`goods_spec_${item.value_id}_${index}`}>{item.value_name}</Tag>;
                        });
                    } else {
                        return "";
                    }
                }
            }, {
                title: "数量",
                dataIndex: "goods_num",
                key: "goods_num"
            }, {
                title: "实际成交价",
                dataIndex: "goods_pay_price",
                key: "goods_pay_price"
            }
        ];

        const data = [
            {
                goods_id,
                goods_title,
                goods_img,
                goods_spec,
                goods_num,
                goods_pay_price
            }
        ];
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>退款商品</p>
                <Table
                    bordered
                    columns={columns}
                    dataSource={data}
                    rowKey={record => `${record.goods_id}_goods`}
                    pagination={false}
                />
            </View>
        );
    }
}
