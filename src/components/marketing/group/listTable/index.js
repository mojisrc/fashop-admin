import React, { Component } from "react";
import { Table, Divider, Input, Select, Button, Form } from "antd";
import { View } from "react-web-dom";
import moment from "moment/moment";
import Query from "@/utils/query"
import OrderModel from "@/models1/order"
import update from "immutability-helper";
import { getQueryPath } from "@/utils";
const FormItem = Form.Item;
const Option = Select.Option;
const orderModel = new OrderModel()

const order_kind_list = [
    {
        name: '全部',
        order_kind: 'all'
    }, {
        name: '普通订单',
        order_kind: 'ordinary'
    }, {
        name: '拼团',
        order_kind: 'group'
    }
]
export default class ListTable extends Component   {
    static defaultProps = {

    }
    state = {
        orderId: 0,
        expandedRowKeys: [],
        list:[],
        totalNumber:0,
        page:1,
        rows:10,
        queryParams: {
            keywords_type: 'goods_name',
            keywords: null,
            create_time: [],
            state_type: 'all',
            order_kind: 'all'
        },

    }

    async componentDidMount() {
        const params = Query.invokerForListParams([
            { key: 'state', rule: ['eq', 'all'] },
            { key: 'keywords_type', rule: ['rely', 'keywords'] },
        ])
        if (params['create_time'] !== undefined) {
            params['create_time'] = [moment(params['create_time'][0]).unix(), moment(params['create_time'][1]).unix()]
        }
        const result = await orderModel.list(params)
        this.setState({
            list:result.list,
            totalNumber:result.total_number,
            page:params.page,
            rows:params.rows,
            queryParams: {
                keywords_type: params['keywords_type'] !== undefined ? params['keywords_type'] : 'goods_name',
                keywords: params['keywords'] !== undefined ? params['keywords'] : null,
                create_time: params['create_time'] !== undefined ? params['create_time'] : [],
                state_type: params['state_type'] !== undefined ? params['state_type'] : 'all',
                order_kind: params['order_kind'] !== undefined ? params['order_kind'] : 'all',
            }
        })
    }

    render() {
        let { list } = this.state
        const { queryParams } = this.state
        const { keywords_type, keywords, create_time, state_type, order_kind } = queryParams
        let create_time_moment = []
        if (create_time.length > 0) {
            create_time_moment = [moment(create_time[0]), moment(create_time[1])]
        }
        const columns = [
            {
                title: "活动标题",
                dataIndex: "sn",
                key: "sn",
            }, {
                title: "拼团限时",
                dataIndex: "create_time",
                key: "create_time",
                render: (text) => {
                    return moment(text, 'X').format('YYYY-MM-DD HH:mm:ss')
                }
            }, {
                title: "活动时间",
                dataIndex: "state",
                key: "state",
                render: (text) => <span>{this.returnOrderState(text)}</span>
            },
            {
                title: "参团人数",
                dataIndex: "freight_fee",
                key: "freight_fee",
                render: (value) => {
                    return `¥${value}`
                }
            }, {
                title: "活动状态",
                dataIndex: "amount",
                key: "amount",
                render: (value) => {
                    return `¥${value}`
                }
            }, {
                title: '操作',
                key: 'operation',
                render: (record) => <div>
                    <a
                        onClick={() => {
                            this.props.history.push(`/order/list/detail?id=${record.id}`)
                        }}
                    >
                        详情
                    </a>
                    <Divider type="vertical" />
                     <a
                        onClick={() => {
                            this.props.history.push(`/order/list/send?id=${record.id}`)
                        }}
                    >
                        发货
                    </a>
                </div>
            }
        ]

        return (
            <View>
                <Form
                    layout="inline"
                    className="ant-advanced-search-form"
                >
                    <FormItem label={`名称`}>
                        <Input
                            placeholder={`请输入活动名称`}
                            onChange={(e) => {
                                this.setState(update(this.state, {
                                    queryParams: { keywords: { $set: e.target.value } }
                                }))
                            }}
                            value={keywords}
                        />
                    </FormItem>
                    <FormItem label={`订单状态`}>
                        <Select
                            placeholder="请选择"
                            style={{ width: 100 }}
                            value={order_kind}
                            onChange={(order_kind) => {
                                this.setState(update(this.state, {
                                    queryParams: { order_kind: { $set: order_kind } }
                                }))
                            }}
                        >
                            {
                                order_kind_list.map((item, index) =>
                                    <Option
                                        value={item.order_kind}
                                        key={index}
                                    >
                                        {item.name}
                                    </Option>
                                )
                            }
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            onClick={() => {
                                const path = getQueryPath('/order/list', {
                                    page: 1,
                                    rows: 10,
                                    keywords_type,
                                    keywords,
                                    create_time,
                                    state_type,
                                    order_kind,
                                })
                                this.props.history.push(path)
                            }}
                            style={{ marginRight: 14 }}
                        >
                            筛选
                        </Button>
                        <Button
                            onClick={() => {
                                const path = getQueryPath('/order/list')
                                this.props.history.push(path)
                            }}
                        >
                            清空筛选
                        </Button>
                    </FormItem>
                </Form>
                {Array.isArray(list) && list.length>0 ? <Table
                    loading={false}
                    dataSource={list}
                    columns={columns}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        pageSize: this.state.rows,
                        total: this.state.totalNumber,
                        current: this.state.page
                    }}
                    onChange={({ current, pageSize }) => {
                        this.props.history.push(Query.page(current, pageSize))
                    }}
                    rowKey={record => record.id}
                /> : ''}
            </View>
        )
    }

    returnOrderState(state) {
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
