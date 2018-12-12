
import React, { Component } from "react";
import { Table, Button, } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import moment from 'moment'
import Query from "../../../utils/query";
import { list } from "../../../models/refund";
import { dispatchProps } from "../../../utils/defaultProps";
import connect from "react-redux/es/connect/connect";

type Props = {
    dispatch: dispatchProps,
    orderRefundList: {
        list: Array<{}>,
        total_number: number,
        page: number,
        rows: number
    },
    orderRefundListLoading: boolean,
    list: Array<{}>,
    list?: Function,
    location: { state: { type: string, record: {} }, search: string },
    history: { push: Function }

}
type State = {
    selectedRowKeys: Array<string>,
    queryParams: {
        keywords_type: string,
        keywords: string | null,
        create_time: Array<{}>,
        refund_type: string,
        refund_state: string,
        order_type: string,
    }
}
@connect(({
              view: {
                  order: {
                      orderRefundList,
                      orderRefundListLoading
                  }
              }
          }) => ({
    orderRefundList,
    orderRefundListLoading,
}))
export default class RefundTable extends Component {
    state = {
        selectedRowKeys: [],
        queryParams: {
            keywords_type: 'goods_name',
            keywords: null,
            create_time: [],
            refund_type: 'all',
            refund_state: 'all',
            order_type: 'all',
        }
    }
    static defaultProps = {
        dispatch: dispatchProps,
        orderRefundListLoading: false,
        orderRefundList: [],
    }

    componentDidMount() {
        const { dispatch } = this.props
        const params = Query.invokerForListParams([
            { key: 'refund_type', rule: ['eq', 'all'] },
            { key: 'refund_state', rule: ['eq', 'all'] },
            { key: 'order_type', rule: ['eq', 'all'] },
            { key: 'keywords_type', rule: ['rely', 'keywords'] },
        ])
        if (params['create_time'] !== undefined) {
            params['create_time'] = [moment(params['create_time'][0]).unix(), moment(params['create_time'][1]).unix()]
        }
        dispatch(list({ params }))
    }

    onSelectChange = (selectedRowKeys: Array<string>) => {
        this.setState({ selectedRowKeys });
    }

    returnRefundState(state: number) {
        switch (state) {
            case 0:
                return <span style={{ color: 'red' }}>未处理</span>
            case 10:
                return '已拒绝退款'
            case 20:
                return '已同意退款'
            case 30:
                return '已完成'
            case 50:
                return '用户主动撤销'
            case 51:
                return '用户主动收货'
            default:
                return '-'

        }
    }

    render() {
        const { orderRefundList, orderRefundListLoading } = this.props;
        const { page, rows, total_number, list } = orderRefundList
        // const { selectedRowKeys } = this.state;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange,
        // };
        const columns = [
            {
                title: "退款编号",
                dataIndex: "refund_sn",
                key: "refund_sn",
            }, {
                title: "退款方式",
                dataIndex: "refund_type",
                key: "refund_type",
                render: (text) => {
                    switch (text) {
                        case 1:
                            return '仅退款'
                        case 2:
                            return '退货退款'
                        default:
                            return '-'

                    }
                }
            }, {
                title: "退款状态",
                dataIndex: "handle_state",
                key: "handle_state",
                render: (text,record) => {
                    return <div>
                        {record.tracking_time > 0 && record.receive === 1 ? <span><span style={{color:'red'}}>待签收</span>，</span> : ''}
                        {record.tracking_time > 0 && record.receive === 2 ? '已经签收，' : ''}
                        {this.returnRefundState(text)}
                    </div>
                }
            }, {
                title: "申请时间",
                dataIndex: "create_time",
                key: "create_time",
                render: text => moment(text, 'X').format('YYYY-MM-DD HH:mm:ss')
            }, {
                title: "订单号",
                dataIndex: "order_sn",
                render: (text,record) =>
                    <a
                        onClick={() => {
                            this.props.history.push(`/order/list/detail?id=${record.order_id}`)
                        }}
                    >
                        {text}
                    </a>
            }, {
                title: "订单金额（元）",
                dataIndex: "order_amount",
                key: "order_amount",
                className: styles.column
            }, {
                title: "收货人",
                dataIndex: "reciver_name",
                key: "reciver_name",
            }, {
                title: "退款原因",
                dataIndex: "user_reason",
                key: "user_reason",
            }, {
                title: '操作',
                key: 'operation',
                className: styles.column,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            this.props.history.push({
                                pathname: `/order/refund/edit`,
                                search: `?id=${record.id}&order_id=${record.order_id}`,
                            })
                        }}
                    >
                        详情
                    </a>
                </View>
            }
        ]
        return (
            <View>
                {/*<View className={styles.batchView}>*/}
                {/*<Button*/}
                {/*type='primary'*/}
                {/*>*/}
                {/*批量导出*/}
                {/*</Button>*/}
                {/*</View>*/}
                <Table
                    loading={orderRefundListLoading}
                    dataSource={list}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showQuickJumper: false,
                        showSizeChanger: false,
                        pageSize: rows,
                        current: page,
                        total: total_number
                    }}
                    // rowSelection={rowSelection}
                    onChange={({ current, pageSize }) => {
                        this.props.history.push(Query.page(current, pageSize))
                    }}
                />
            </View>
        )
    }
}
