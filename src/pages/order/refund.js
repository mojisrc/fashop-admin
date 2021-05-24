import React, { Component } from "react";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card,Table } from "antd";
import PageList from "@/components/pageList";
import { history as router } from "umi";
import moment from "dayjs";

@connect(({ refund, loading }) => ({
    refundList: refund.list.result,
    refundListLoading: loading.effects["refund/list"]
}))
export default class Refund extends Component {
    static defaultProps = {
        refundListLoading: true,
        refundList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/order/refund",
        rows:10,
        param: {
            keywords_type: "goods_name",
            keywords: null,
            create_time: [],
            refund_type: null,
            refund_state: null,
            sort_type: null
        },
        rule: [{ key: "keywords_type", rule: ["rely", "keywords"] }],
        refresh: (e) => {
            this.initList(e);
        }
    });

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "refund/list",
            payload: this.search.filter()
        });
    };

    componentDidMount() {
        this.initList();
    }

    render() {
        const { refundList, refundListLoading } = this.props;
        const {
            keywords_type,
            keywords,
            create_time,
            refund_type,
            refund_state,
            sort_type
        } = this.search.getParam();
        const columns = [
            {
                title: "退款编号",
                dataIndex: "refund_sn",
                key: "refund_sn"
            }, {
                title: "退款方式",
                dataIndex: "refund_type",
                key: "refund_type",
                render: (text) => {
                    switch (text) {
                        case 1:
                            return "仅退款";
                        case 2:
                            return "退货退款";
                        default:
                            return "-";

                    }
                }
            }, {
                title: "退款状态",
                dataIndex: "handle_state",
                key: "handle_state",
                render: (text, record) => {
                    return <div>
                        {record.tracking_time > 0 && record.receive === 1 ?
                            <span><span style={{ color: "red" }}>待签收</span>，</span> : ""}
                        {record.tracking_time > 0 && record.receive === 2 ? "已经签收，" : ""}
                        {this.returnRefundState(text)}
                        {record.success_time > 0  ? "，已打款" : ""}
                    </div>;
                }
            }, {
                title: "申请时间",
                dataIndex: "create_time",
                key: "create_time",
                render: text => moment(text, "X").format("YYYY-MM-DD HH:mm")
            }, {
                title: "订单号",
                dataIndex: "order_sn",
                render: (text, record) =>
                    <a
                        onClick={() => {
                            router.push(`/order/list/detail?id=${record.order_id}`);
                        }}
                    >
                        {text}
                    </a>
            }, {
                title: "支付方式",
                dataIndex: "payment_code",
                render: (text, record) =>this.getPayName(record.payment_code)
            }, {
                title: "退款金额",
                dataIndex: "refund_amount",
                key: "refund_amount",
                align: 'center',
                render:(text) => `${text}元`
            }, {
                title: "订单金额",
                dataIndex: "order_amount",
                key: "order_amount",
                align: 'center',
                render:(text) => `${text}元`
            }, {
                title: "收货人",
                dataIndex: "reciver_name",
                key: "reciver_name"
            }, {
                title: "退款原因",
                dataIndex: "user_reason",
                key: "user_reason"
            }, {
                title: "操作",
                key: "operation",
                align: 'center',
                render: (record) => <a
                    onClick={() => {
                        router.push({
                            pathname: `/order/refund/edit`,
                            search: `?id=${record.id}`
                        });
                    }}
                >
                    详情
                </a>
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'orderrefund/list'}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={refundListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                selectInput: [
                                    {
                                        field: "keywords_type",
                                        style: { minWidth: 115 },
                                        initialValue: keywords_type,
                                        data: [
                                            {
                                                name: "商品名称",
                                                value: "goods_name"
                                            },
                                            {
                                                name: "订单号",
                                                value: "order_no"
                                            },
                                            {
                                                name: "退款编号",
                                                value: "receiver_name"
                                            },
                                            {
                                                name: "收货人",
                                                value: "receiver_phone"
                                            },
                                            {
                                                name: "联系方式",
                                                value: "courier_number"
                                            }
                                        ]
                                    },
                                    {
                                        field: "keywords",
                                        placeholder: "请输入关键词",
                                        initialValue: keywords
                                    }
                                ]
                            },
                            {
                                label: "退款类型",
                                select: {
                                    field: "refund_type",
                                    style: { width: 100 },
                                    placeholder: "全部类型",
                                    data: [
                                        { name: "仅退款", value: "1" },
                                        { name: "退货退款", value: "2" },
                                    ],
                                    initialValue: refund_type
                                }
                            },
                            {
                                label: "退款状态",
                                select: {
                                    field: "refund_state",
                                    style: { width: 200 },
                                    placeholder: "全部状态",
                                    data: [
                                        { name: "申请退款，等待商家确认", value: "1" },
                                        { name: "同意申请，等待买家退货", value: "2" },
                                        { name: "买家已发货，等待收货", value: "3" },
                                        { name: "已收货，确认退款", value: "4" },
                                        { name: "退款成功", value: "5" },
                                        { name: "退款关闭", value: "6" },
                                        { name: "同意退款，仅退款", value: "7" },
                                        { name: "拒绝(驳回)", value: "8" },
                            ],
                                    initialValue: refund_state
                                }
                            },
                            {
                                label: "申请时间",
                                timeRange: {
                                    field: "create_time",
                                    initialValue: create_time
                                }
                            },
                            {
                                label: "排序",
                                select: {
                                    field: "sort_type",
                                    style: { width: 200 },
                                    placeholder: "默认排序",
                                    data: [
                                        { name: "申请时间早到晚", value: "1" },
                                        { name: "申请时间晚到早", value: "2" }
                                    ],
                                    initialValue: sort_type
                                }
                            }
                        ]} />
                    <Table
                        loading={refundListLoading}
                        dataSource={refundList.list}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: refundList.total_number
                        }}
                        onChange={({ current }) => {
                            this.search.setPage(current).push();
                        }}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
    getPayName(payment_code){
        switch (payment_code) {
            case 'balance':
                return '余额支付'
            case 'wechat_mini':
                return '微信支付'
            case 'wechat_app':
                return '微信支付'
            case 'alipay_app':
                return '支付宝支付'
        }
    }
    returnRefundState(state) {
        switch (state) {
            case 0:
                return <span style={{ color: "red" }}>未处理</span>;
            case 10:
                return "已拒绝";
            case 20:
                return "已同意";
            case 30:
                return "已完成";
            case 50:
                return "用户已撤销";
            case 51:
                return "用户已收货";
            default:
                return "-";
        }
    }
}
