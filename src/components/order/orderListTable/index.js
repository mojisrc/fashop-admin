
import React, { Component } from "react";
import { Table, Modal } from "antd";
import * as ReactDOM from 'react-dom';
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from 'dva';

import { dispatchProps } from "@/utils/defaultProps";
import moment from "moment/moment";
import Image from '../../image'
import { list } from "../../../models/order";
import Query from "@/utils/query"
import EditAddress from "../editAddress"
import EditPrice from "../editPrice"

type Props = {
    history: historyType,
    dispatch: dispatchType,
    orderListLoading: boolean,
    list: Function,
    orderList: {
        page: number,
        rows: number,
        total_number: number,
        list: Array<{
            extend_order_extend: {
                reciver_name: string,
                reciver_info: {
                    address: string,
                    name: string,
                    phone: string,
                    rows?: number
                },
                remark: string,
            },
            extend_order_goods: Array<{
                reciver_info: {
                    address: string,
                    name: string,
                    phone: string,
                    rows?: number
                },
                rows: number,
            }>
        }>,
    },
}
type State = {
    orderId: number,
    expandedRowKeys: Array<string>
}
@connect(({
              view: {
                  order: {
                      orderList,
                      orderListLoading
                  }
              }
          }) => ({
    orderList,
    orderListLoading,
}))


export default class OrderManagementTable extends Component   {
    static defaultProps = {
        dispatch: dispatchProps,
        orderListLoading: false,
        orderList: {},
    }
    state = {
        orderId: 0,
        visible: false,
        visible: false,
        expandedRowKeys: []
    }

    componentDidMount() {
        const { dispatch } = this.props
        const params = Query.invokerForListParams([
            { key: 'state', rule: ['eq', 'all'] },
            { key: 'keywords_type', rule: ['rely', 'keywords'] },
        ])
        if (params['create_time'] !== undefined) {
            params['create_time'] = [moment(params['create_time'][0]).unix(), moment(params['create_time'][1]).unix()]
        }
        dispatch(list({ params }))
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.orderList.list !== this.props.orderList.list) {
            this.setState({
                expandedRowKeys: nextProps.orderList.list.map((item: any) => item.id)
            })
        }
    }

    onSelectChange = (selectedRowKeys: Array<string>) => {
    }

    render() {
        const { orderList, orderListLoading } = this.props
        const { orderId, expandedRowKeys } = this.state
        let { list } = orderList
        if (list) {
            list.map((item) => {
                item.extend_order_goods.map((goods) => {
                    goods["reciver_info"] = item.extend_order_extend.reciver_info
                    goods["rows"] = item.extend_order_goods.length
                    return goods
                })
                return item
            })

        }

        const columns = [
            {
                title: "订单号",
                dataIndex: "sn",
                key: "sn",
            }, {
                title: "下单时间",
                dataIndex: "create_time",
                key: "create_time",
                render: (text) => {
                    return moment(text, 'X').format('YYYY-MM-DD HH:mm:ss')
                }
            }, {
                title: "订单状态",
                dataIndex: "state",
                key: "state",
                render: (text) => <span>{this.returnOrderState(text)}</span>
            },
            {
                title: "运费（元）",
                dataIndex: "freight_fee",
                key: "freight_fee",
                render: (value) => {
                    return `¥${value}`
                }
            }, {
                title: "商品总额（元）",
                dataIndex: "amount",
                key: "amount",
                render: (value) => {
                    return `¥${value}`
                }
            }, {
                title: '操作',
                key: 'operation',
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            const container = document.createElement('div')
                            ReactDOM.render(<EditAddress
                                orderId={record.id}
                                visible={true}
                                onCancel={() => {
                                    ReactDOM.unmountComponentAtNode(container)
                                }}
                            />, container);
                        }}
                    >
                        修改地址
                    </a>
                    <a
                        onClick={() => {
                            const container = document.createElement('div')
                            ReactDOM.render(<EditPrice
                                orderId={record.id}
                                visible={true}
                                onCancel={() => {
                                    ReactDOM.unmountComponentAtNode(container)
                                }}
                            />, container);
                        }}
                    >
                        改价
                    </a>
                    <a
                        onClick={() => {
                            this.props.history.push(`/order/list/detail?id=${record.id}`)
                        }}
                    >
                        详情
                    </a>
                    {record.state === 20 ? <a
                        onClick={() => {
                            this.props.history.push(`/order/list/send?id=${record.id}`)
                        }}
                    >
                        发货
                    </a> : ''}

                </View>
            }
        ]
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
                className: `${styles.goodsTitle}`,
            }, {
                title: "规格",
                dataIndex: "goods_spec",
                key: "goods_spec",
                className: `${styles.goodsSpec}`,
                render: (goods_spec) => {
                    return goods_spec[0].id > 0 ? goods_spec.map(function (item) {
                        return item.value_name + ' '
                    }) : '-'
                }
            }, {
                title: "数量",
                dataIndex: "goods_num",
                key: "goods_num",
                className: `${styles.goodsNum}`,
                render: (value) => {
                    return `${value} 件`
                }
            }, {
                title: "单价",
                dataIndex: "goods_price",
                key: "goods_price",
                className: `${styles.goodsPrice}`,
                render: (value) => {
                    return `¥${value}`
                }
            }, {
                title: "收货人",
                dataIndex: "reciver_info.name",
                key: "reciver",
                className: `${styles.reciver} ${styles.borderLeft}`,
                render: (value, row, index) => {
                    return { children: `${value}`, props: { rowSpan: index === 0 ? row.rows : 0 } }
                },
            }
            , {
                title: '联系方式',
                dataIndex: "reciver_info.phone",
                key: 'reciver_phone',
                className: `${styles.reciverPhone} ${styles.borderLeft}`,
                render: (value, row, index) => {
                    return { children: value, props: { rowSpan: index === 0 ? row.rows : 0 } }
                }
            },
            {
                title: '收货地址',
                dataIndex: "reciver_info.address",
                key: 'reciver_address',
                className: `${styles.reciverAddress} ${styles.borderLeft}`,
                render: (value, row, index) => {
                    return { children: value, props: { rowSpan: index === 0 ? row.rows : 0 } }
                }
            }
        ]

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
                            defaultExpandAllRows={true}
                            rowKey={record => `${record.id}_child`}
                        />
                    )}
                    onExpand={(expanded, record) => {
                        let expandedRowKeys = this.state.expandedRowKeys;
                        if (expanded) {
                            expandedRowKeys.push(record.id);
                        } else {
                            expandedRowKeys = expandedRowKeys.filter(v => v !== record.id);
                        }
                        this.setState({ expandedRowKeys });
                    }}
                    expandedRowKeys={expandedRowKeys}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        pageSize: orderList.rows,
                        total: orderList.total_number,
                        current: orderList.page
                    }}
                    onChange={({ current, pageSize }) => {
                        this.props.history.push(Query.page(current, pageSize))
                    }}
                    rowKey={record => record.id}
                /> : ''}
            </View>
        )
    }

    returnOrderState(state: number) {
        switch (state) {
            case 0:
                return '已取消'
            case 10:
                return <span style={{ color: '#ccc' }}>未支付</span>
            case 20:
                return <span style={{ color: '#EC9729' }}>待发货</span>
            case 30:
                return <span style={{ color: '#6AEB52' }}>已发货</span>
            case 40:
                return '已完成'
            default:
                return ''
        }
    }
}
