import React, { Component } from "react";
import { Table } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "dva";
import moment from "moment/moment";
import Image from "@/components/image/index";
import { getOrderList } from "@/actions/order";
import Query from "@/utils/query";
// type Props = {
//     user_id: number,
//     history: historyType,
//     dispatch: dispatchType,
//     orderListLoading: boolean,
//     getOrderList: Function,
//     orderList: {
//         page: number,
//         rows: number,
//         total_number: number,
//         list: Array<{
//             extend_order_extend: {
//                 reciver_name: string,
//                 reciver_info: {
//                     address: string,
//                     name: string,
//                     phone: string,
//                     rows?: number
//                 },
//                 remark: string,
//             },
//             extend_order_goods: Array<{
//                 reciver_info: {
//                     address: string,
//                     name: string,
//                     phone: string,
//                     rows?: number
//                 },
//                 rows: number
//             }>
//         }>,
//     },
// }
@connect(({ order, loading }) => ({
    orderList: order.list.result,
    orderListLoading: loading.effects["order/list"]
}))
export default class OrderManagementTable extends Component {
    static defaultProps = {
        orderListLoading: false,
        orderList: {}
    };
    state = {
        page: 1,
        rows: 10,
        expandedRowKeys: []
    };

    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch, user_id } = this.props;
        const get = Query.make([
            { key: "state", rule: ["eq", "all"] },
            { key: "keywords_type", rule: ["rely", "keywords"] }
        ]);
        if (get["create_time"] !== undefined) {
            get["create_time"] = [moment(get["create_time"][0]).unix(), moment(get["create_time"][1]).unix()];
        }
        params["user_ids"] = [user_id];

        dispatch({
            type: "order/list",
            payload: {
                page: get.page,
                rows: get.rows
            },
            callback: (response) => {
                const { result: { list } } = response;
                this.setState({
                    get,
                    expandedRowKeys: Array.isArray(list) ? list.map((item) => item.id) : []
                });
            }
        });
    }

    render() {
        const { orderList, orderListLoading } = this.props;
        let { list } = orderList;
        if (list) {
            list.map((item) => {
                item.extend_order_goods.map((goods) => {
                    goods["reciver_info"] = item.extend_order_extend.reciver_info;
                    goods["rows"] = item.extend_order_goods.length;
                    return goods;
                });
                return item;
            });
        }
        const columns = [
            {
                title: "订单号",
                dataIndex: "sn",
                key: "sn"
            }, {
                title: "下单时间",
                dataIndex: "create_time",
                key: "create_time",
                render: (text) => {
                    return moment(text, "X").format("YYYY-MM-DD HH:mm:ss");
                }
            }, {
                title: "订单状态",
                dataIndex: "state_type",
                key: "state_type",
                render: (text) => <span>{this.returnOrderState(text)}</span>
            },
            {
                title: "运费（元）",
                dataIndex: "freight_fee",
                key: "freight_fee",
                render: (value) => {
                    return `¥${value}`;
                }
            }, {
                title: "商品总额（元）",
                dataIndex: "amount",
                key: "amount",
                render: (value) => {
                    return `¥${value}`;
                }
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push(`/order/list/detail?id=${record.id}`);
                        }}
                    >
                        详情
                    </a>
                </View>
            }
        ];
        const expandedRowColumns = [
            {
                title: "商品图",
                dataIndex: "goods_img",
                key: "goods_img",
                className: `${styles.goodsGoodsImg} ${styles.borderRightNone}`,
                render: (e) => (
                    <Image
                        type='goods'
                        src={e}
                        style={{ width: 32, height: 32 }}
                    />
                )
            }, {
                title: "商品名称",
                dataIndex: "goods_title",
                key: "goods_title",
                className: `${styles.goodsTitle}`
            }, {
                title: "规格",
                dataIndex: "goods_spec",
                key: "goods_spec",
                className: `${styles.goodsSpec}`,
                render: (goods_spec) => {
                    return goods_spec[0].id > 0 ? goods_spec.map(function(item) {
                        return item.value_name + " ";
                    }) : "-";
                }
            }, {
                title: "数量",
                dataIndex: "goods_num",
                key: "goods_num",
                className: `${styles.goodsNum}`,
                render: (value) => {
                    return `${value} 件`;
                }
            }, {
                title: "单价",
                dataIndex: "goods_price",
                key: "goods_price",
                className: `${styles.goodsPrice}`,
                render: (value) => {
                    return `¥${value}`;
                }
            }, {
                title: "收货人",
                dataIndex: "reciver_info.name",
                key: "reciver",
                className: `${styles.reciver} ${styles.borderLeft}`,
                render: (value, row, index) => {
                    return { children: `${value}`, props: { rowSpan: index === 0 ? row.rows : 0 } };
                }
            }
            , {
                title: "联系方式",
                dataIndex: "reciver_info.phone",
                key: "reciver_phone",
                className: `${styles.reciverPhone} ${styles.borderLeft}`,
                render: (value, row, index) => {
                    return { children: value, props: { rowSpan: index === 0 ? row.rows : 0 } };
                }
            },
            {
                title: "收货地址",
                dataIndex: "reciver_info.address",
                key: "reciver_address",
                className: `${styles.reciverAddress} ${styles.borderLeft}`,
                render: (value, row, index) => {
                    return { children: value, props: { rowSpan: index === 0 ? row.rows : 0 } };
                }
            }
        ];
        return (
            <View>
                {orderList.list ? <Table
                    loading={orderListLoading}
                    dataSource={orderList.list ? orderList.list : []}
                    columns={columns}
                    expandedRowRender={record => (
                        <Table

                            dataSource={record.extend_order_goods ? record.extend_order_goods : []}
                            columns={expandedRowColumns}
                            pagination={false}
                            rowKey={record => `${record.id}_child`}
                        />
                    )}
                    defaultExpandAllRows={false}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        pageSize: this.state.rows,
                        total: orderList.total_number,
                        current: this.state.page
                    }}
                    onChange={({ current, pageSize }) => {
                        // this.setState({
                        //     page:current,
                        //     rows:pageSize
                        // })
                        // this.initList()
                        router.push(Query.page(current, pageSize));
                    }}
                    rowKey={record => record.id}
                /> : ""}
            </View>
        );
    }

    returnOrderState(text: string) {
        switch (text) {
            case "state_new":
                return "待支付";
            case "state_pay":
                return "待发货";
            case "state_send":
                return "待收货";
            case "state_success":
                return "已完成";
            case "state_noeval":
                return "待评价";
            case "state_cancel":
                return "已取消";
            default:
                return "";
        }
    }
}
