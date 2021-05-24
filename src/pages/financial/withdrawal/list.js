import React, { Component, Fragment } from "react";
import { Table, Card, Divider, Modal } from "antd";
import { connect } from "umi";
import moment from "dayjs";
import PageHeaderWrapper from "@/components/pageHeaderWrapper/index";
import PageList from "@/components/pageList/index";

@connect(({ assetsWithdrawal, loading }) => ({
    assetsWithdrawalList: assetsWithdrawal.list.result,
    assetsWithdrawalListLoading: loading.effects["assetsWithdrawal/list"]
}))
class WithdrawalList extends Component {
    static defaultProps = {
        assetsWithdrawalListLoading: true,
        assetsWithdrawalList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/financial/withdrawal/list",
        param: {
            keywords: null,
            state:null,
        },
        rule: [],
        refresh: () => {
            this.initList();
        }
    });

    componentDidMount() {
        this.initList();
    }

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "assetsWithdrawal/list",
            payload: this.search.filter()
        });
    };

    render() {
        const { assetsWithdrawalList, assetsWithdrawalListLoading,dispatch } = this.props;
        let {  keywords, state } = this.search.getParam();

        const columns = [
            {
                title: "编号",
                dataIndex: "sn",
                key: "sn"
            }, {
                title: "提现方式",
                dataIndex: "payment_code",
                key: "payment_code",
                render: (text) => {
                    const payment_code = {
                        "alipay": "支付宝"
                    };
                    return payment_code[text] ?? text;
                }
            },
            {
                title: "支付宝真实姓名",
                dataIndex: "alipay_name",
                key: "alipay_name"
            },
            {
                title: "支付宝账户",
                dataIndex: "alipay_account",
                key: "alipay_account"
            },
            {
                title: "审核状态",
                dataIndex: "state",
                render: (text) => {
                    const state = {
                        0: "未处理",
                        1: "已通过",
                        2: "已拒绝",
                    };
                    return state[text];
                }
            }, {
                title: "申请时间",
                dataIndex: "create_time",
                key: "create_time",
                render: (text) => {
                    return text > 0 ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-";
                }
            }, {
                title: "提现金额（元）",
                dataIndex: "amount",
                key: "amount"
            }, {
                title: "交易号",
                dataIndex: "trade_no",
                key: "trade_no",
                render: (text) => {
                    return text ?? "-";
                }
            }, {
                title: "支付时间",
                dataIndex: "payment_time",
                key: "payment_time",
                render: (text) => {
                    return text > 0 ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-";
                }
            }, {
                title: "支付状态",
                dataIndex: "payment_state",
                key: "payment_state",
                render: (text) => {
                    return text > 0 ? "已支付" : "-";
                }
            }, {
                title: "操作",
                key: "operation",
                render: (text, record) => <Fragment>
                    {record.state === 0 && record.state !== 1 ? <Fragment>
                        <a
                            onClick={() => {
                                Modal.confirm({
                                    title: "确认审核通过吗？",
                                    okText: "确认",
                                    okType: "danger",
                                    cancelText: "取消",
                                    onOk: async () => {
                                        dispatch({
                                            type: "assetsWithdrawal/examine",
                                            payload: {
                                                state:1,
                                                id: record.id
                                            },
                                            callback: () => {
                                                this.initList();
                                            }
                                        });
                                    }
                                });
                            }}
                        >
                            通过
                        </a>
                    </Fragment> : null}


                    {record.state === 0 && record.state !== 2 ? <Fragment>
                        <Divider type="vertical" />
                        <a
                            onClick={() => {
                                Modal.confirm({
                                    title: "确认驳回吗？",
                                    okText: "确认",
                                    okType: "danger",
                                    cancelText: "取消",
                                    onOk: async () => {
                                        dispatch({
                                            type: "assetsWithdrawal/examine",
                                            payload: {
                                                state:2,
                                                id: record.id
                                            },
                                            callback: () => {
                                                this.initList();
                                            }
                                        });
                                    }
                                });
                            }}
                        >
                            驳回
                        </a>
                        <Divider type="vertical" />
                    </Fragment> : null}

                    {record.state === 1 && record.payment_state !== 1 ? <Fragment>
                        <a
                            onClick={() => {
                                Modal.confirm({
                                    title: "将会从您的支付宝账号打款给对方，确认要打款吗？",
                                    okText: "确认",
                                    okType: "danger",
                                    cancelText: "取消",
                                    onOk: async () => {
                                        dispatch({
                                            type: "assetsWithdrawal/payment",
                                            payload: {
                                                id: record.id
                                            },
                                            callback: () => {
                                                this.initList();
                                            }
                                        });
                                    }
                                });
                            }}
                        >
                            打款
                        </a>
                    </Fragment> : null}
                </Fragment>
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'asetswithdrawal/list'}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={assetsWithdrawalListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                input: {
                                    field: "keywords",
                                    placeholder: "请输入关键词",
                                    initialValue: keywords
                                }
                            },
                            {
                                label: "审核状态",
                                select: {
                                    field: "state",
                                    style: { width: 100 },
                                    placeholder: "全部类型",
                                    data: [
                                        { value: 0, name: "待处理" },
                                        { value: 1, name: "已通过" },
                                        { value: 2, name: "已驳回" },
                                        { value: 3, name: "已打款" }
                                    ],
                                    initialValue: state
                                }
                            }
                        ]} />
                    <Table
                        defaultExpandAllRows
                        loading={assetsWithdrawalListLoading}
                        dataSource={assetsWithdrawalList.list ? assetsWithdrawalList.list : []}
                        columns={columns}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: assetsWithdrawalList.total_number
                        }}
                        onChange={({ current }) => {
                            this.search.setPage(current).push();
                        }}
                        rowKey={record => record.id}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}


const keywords_type_list = [
    {
        name: "账号人",
        value: "bank_user"
    }
];
export default WithdrawalList;
