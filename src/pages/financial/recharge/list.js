import React, { Component } from "react";
import { Table, Card } from "antd";
import { connect } from "umi";
import moment from "dayjs";
import PageHeaderWrapper from "@/components/pageHeaderWrapper/index";
import PageList from "@/components/pageList/index";
import Image from "@/components/image";

@connect(({ assetsRecharge, loading }) => ({
    assetsRechargeList: assetsRecharge.list.result,
    assetsRechargeListLoading: loading.effects["assetsRecharge/list"]
}))
class RechargeList extends Component {
    static defaultProps = {
        assetsRechargeListLoading: true,
        assetsRechargeList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/assetsRecharge/list",
        param: {
            keywords_type: "sn",
            keywords: null
        },
        rule: [{ key: "keywords_type", rule: ["rely", "keywords"] }],
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
            type: "assetsRecharge/list",
            payload: this.search.filter(),
            callback: (response) => {
                const { result: { list } } = response;
                this.setState({
                    expandedRowKeys: Array.isArray(list) ? list.map((item) => item.id) : []
                });
            }
        });
    };

    render() {
        const { assetsRechargeList, assetsRechargeListLoading } = this.props;
        let { keywords_type, keywords ,payment_state} = this.search.getParam();

        const columns = [
            {
                title: "订单号",
                dataIndex: "sn",
                key: "sn"
            }, {
                title: "充值方式",
                dataIndex: "payment_code",
                key: "payment_code",
                render: (text) => {
                    const payment_code = {
                        "alipay": "支付宝",
                        "wechat": "微信支付",
                    };
                    return payment_code[text] ?? text;
                }
            },
            {
                title: "头像",
                dataIndex: "user_avatar",
                key: "user_avatar",
                render: (user_avatar) => (
                    <Image
                        type='avatar'
                        src={user_avatar}
                        style={{ width: 20, height: 20 }}
                    />
                )
            },
            {
                title: "昵称",
                dataIndex: "user_nickname",
                key: "user_nickname",
            }, {
                title: "充值金额",
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
                title: "支付状态",
                dataIndex: "payment_state",
                key: "payment_state",
                render: (text) => {
                    return text > 0 ? "已支付" : "未付款";
                }
            }, {
                title: "支付时间",
                dataIndex: "payment_time",
                key: "payment_time",
                render: (text) => {
                    return text > 0 ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-";
                }
            }, {
                title: "充值时间",
                dataIndex: "create_time",
                key: "create_time",
                render: (text) => {
                    return text > 0 ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-";
                }
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'assetsrecharge/list'}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={assetsRechargeListLoading}
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
                                        data: keywords_type_list
                                    },
                                    {
                                        field: "keywords",
                                        placeholder: "请输入关键词",
                                        initialValue: keywords
                                    }
                                ],
                            },
                            {
                                label: "审核状态",
                                select: {
                                    field: "payment_state",
                                    style: { width: 100 },
                                    placeholder: "支付类型",
                                    data: [
                                        { value: 0, name: "待支付" },
                                        { value: 1, name: "已支付" },
                                    ],
                                    initialValue: payment_state
                                }
                            }
                        ]} />
                    <Table
                        defaultExpandAllRows
                        loading={assetsRechargeListLoading}
                        dataSource={assetsRechargeList.list ? assetsRechargeList.list : []}
                        columns={columns}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: assetsRechargeList.total_number
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
        name: "订单号",
        value: "sn"
    }
];
export default RechargeList;
