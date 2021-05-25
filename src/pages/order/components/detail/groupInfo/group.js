import React, { Component } from "react";
import { Table } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import dayjs from "dayjs";

export default class OrderDetailGoodsInfo extends Component {
    render() {
        const { extend_order_goods } = this.props
        const columns = [
            {
                title: '昵称',
                dataIndex: 'goods_title',
            }, {
                title: '身份',
                dataIndex: 'goods_num',
            }, {
                title: '参与时间',
                dataIndex: 'create_time',
                render: text => dayjs(text*1000).format('YYYY-MM-DD HH:mm:ss')
            }, {
                title: '拼团状态',
                dataIndex: 'group_state',
            }, {
                title: '订单状态',
                dataIndex: 'order_state',
            }, {
                title: '消费金额（元）',
                dataIndex: 'goods_pay_price',
            }, {
                title: '操作',
                key: 'operating',
                render: (record) => <a
                    onClick={() => {

                    }}
                >
                    订单详情
                </a>
            }
        ]

        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>组团信息</p>
                <Table
                    bordered
                    columns={columns}
                    dataSource={extend_order_goods}
                    rowKey={record => record.id}
                    pagination={false}
                />
            </View>
        );
    }
}
